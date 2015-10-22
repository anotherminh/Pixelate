class SessionsController < ApplicationController
  def new
    render :new
  end

  def make_username
    username = "sample_user_"

    3.times do
      username += ('1'..'9').to_a.sample
    end

    username
  end

  def make_password
    password = ""

    8.times do
      password += ('1'..'9').to_a.sample
    end

    password
  end

  def make_new_guest
    username = make_username
    password = make_password

    if User.create({ username: username, password: password })
      return { username: username, password: password }
    else
      make_new_guest
    end
  end

  def signInAsGuest
    user_params = make_new_guest

    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    log_in_user(@user)
    render json: { "signed in" => true }
  end

  def create
    username = session_params[:username]
    password = session_params[:password]
    @user = User.find_by_credentials(username, password)

    if @user
      log_in_user(@user)
      redirect_to '/app/#/'
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
