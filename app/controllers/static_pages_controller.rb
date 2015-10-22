class StaticPagesController < ApplicationController
  def app
    if current_user
      render :app
    else
      render :splash_page
    end
  end

  def welcome
    if current_user
      render :app
    else
      render :splash_page
    end
  end
end
