class Api::DrawingsController < ApplicationController
  def show
    @drawing = Drawing.find(params[:id])
    render :show
  end

  def create
    @drawing = Drawing.new(drawing_params)
    if @drawing.save
      render :show
    end
  end

  def new
    cells = []
    625.times do
      cells << "white"
    end

    @new_drawing = Drawing.new(title: "test", content: cells, size: 25)
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
