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

  def index
    @drawings = Drawing.all.includes(:kudos)
    render :index
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
