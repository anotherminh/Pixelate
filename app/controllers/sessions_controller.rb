class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    username = params[:user][:username]
    password = params[:user][:password]
    @user = User.find_by_credentials(username, password)

    if @user
      log_in_user(@user)
      redirect_to "/#/drawings/new"
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
end
