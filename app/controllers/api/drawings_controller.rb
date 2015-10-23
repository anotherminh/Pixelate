class Api::DrawingsController < ApplicationController
  def show
    @drawing = Drawing.includes(:kudos, :user, :comments, comments: [:user]).where('drawings.id = ?', params[:id])[0]
    render :show
  end

  def edit
    @drawing = current_user.drawings.find(params[:id])
    if @drawing
      render :show
    else
      raise "You can't edit someone else's drawing!"
    end
  end

  def create
    @drawing = current_user.drawings.new(drawing_params)
    if @drawing.save
      render :show
    end
  end

  def new
    cells = []
    2500.times do
      cells << "#eee"
    end

    @new_drawing = current_user.drawings.new(content: cells, size: 50)
    render :new
  end

  def update
    @drawing = current_user.drawings.find(params[:id])
    if @drawing && @drawing.update(drawing_params)
      render :show
    end
  end

  def hot_drawings
    @drawings = Drawing
                  .select("drawings.*, COUNT(kudos.id) AS kudos_count")
                  .joins(:kudos)
                  .group('drawings.id')
                  .order('kudos_count DESC')
                  .limit(8)
                  .includes(:comments)
    @drawings.preload(:kudos)
    render 'api/drawings/index.json.jbuilder'
  end

  def page
    if params[:id]
      page_num = params[:id]
    else
      page_num = 1
    end

    @drawings = Drawing.includes(:kudos).order('drawings.created_at DESC').page(page_num).per(20)

    render 'api/drawings/index.json.jbuilder'
  end

  def destroy
    @drawing = current_user.drawings.find(params[:id])
    if @drawing && @drawing.delete
      render :show
    end
  end

  private
  def drawing_params
    params.require(:drawing).permit(:title, :size, { content: [] }, :data_url)
  end
end
