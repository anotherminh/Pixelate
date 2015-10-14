class StaticPagesController < ApplicationController
  def app
    render :app
  end

  def welcome
    render :splash_page
  end
end
