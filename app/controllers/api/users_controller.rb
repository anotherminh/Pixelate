class Api::UsersController < ApplicationController
  def index
    @users = User.all.includes(:drawings, drawings: [:kudos])
    render :index
  end

  def show
    @user = User.includes(:liked_drawings, :drawings, drawings: [:kudos]).where('users.id = ?', params[:id])[0]
    render :show
  end

  def search
    @user_matches = User.joins(:drawings).where("users.username LIKE ?", "%#{params[:input]}%").group("users.id")
    @drawing_matches = Drawing.where("drawings.title LIKE ?", "%#{params[:input]}%")
    render :search
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
