class Api::DrawingsController < ApplicationController
  def show
    @drawing = Drawing.find(params[:id])
    render :show
  end

  def new
    cells = []
    625.times do
      cells << "white"
    end

    @new_drawing = Drawing.new(title: "test", content: cells, size: 25)
    render :new
  end
end
