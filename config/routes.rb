Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :drawings, only: [:create, :show, :index, :new, :update, :destroy]
  end

  resources :users, only: [:new, :create]
end
