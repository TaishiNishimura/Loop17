Rails.application.routes.draw do
  get 'users/sign_in' => 'homes#top'
  get 'users/sign_up' => 'homes#top'
  devise_for :users,skip: [:passwords,]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'homes#top'

  resources :users, only: [:index, :edit, :update, :destroy] do
    resource :relationships, only: [:create, :destroy]
    get 'followings' => 'relationships#followings', as: 'followings'
    get 'followers' => 'relationships#followers', as: 'followers'
  end

  resources :audios, only: [:new, :create, :update, :destroy]

  get 'search' => 'audios#search'
end
