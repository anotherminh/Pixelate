class Api::DrawingsController < ApplicationController
  def show
    @drawing = current_user.drawings.find(params[:id])
    render :show
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
      cells << "white"
    end

    @new_drawing = current_user.drawings.new(title: "test", content: cells, size: 50)
    render :new
  end

  def update
    @drawing = Drawing.find(params[:id])
    if @drawing && @drawing.update(drawing_params)
      render :show
    end
  end

  private
  def drawing_params
    params.require(:drawing).permit(:title, :size, { content: [] })
  end
end
