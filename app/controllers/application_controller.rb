class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def log_in_user(user)
    session[:session_token] = user.reset_token!
  end

  def redirect_non_users
    redirect_to new_session_url unless current_user
  end
end
