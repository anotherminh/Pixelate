Rails.application.routes.draw do
  root to: 'static_pages#welcome'

  get '/app', to: 'static_pages#app'
  get '/guest_sign_in', to: 'sessions#signInAsGuest'

  namespace :api do
    get '/best_drawings', to: 'drawings#hot_drawings'
    get '/browse/:id', to: 'drawings#page'
    get '/users/search/', to: 'users#search'
  end

  namespace :api, defaults: {format: :json} do
    resources :drawings, only: [:create, :show, :edit, :new, :update, :destroy]
    resources :users, only: [:index, :show]
    resources :kudos, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
