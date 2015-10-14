Rails.application.routes.draw do
  root to: 'static_pages#welcome'

  get '/app', to: 'static_pages#app'

  namespace :api, defaults: {format: :json} do
    resources :drawings, only: [:create, :show, :index, :new, :update, :destroy]
    resources :users, only: [:index, :show]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
