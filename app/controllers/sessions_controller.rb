class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    username = session_params[:username]
    password = session_params[:password]
    @user = User.find_by_credentials(username, password)

    if @user
      log_in_user(@user)
      render json: { "signed in" => true }
    else
      flash.now[:errors] = ["Credentials do not match"]
      render :new
    end
  end

  def destroy
    current_user.reset_token!
    session[:session_token] = nil
    render json: { "deleted" => true }
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end
end
