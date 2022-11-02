Rails.application.routes.draw do
  resources :todo_lists do
    resources :todo_items
  end
  root to: 'pages#index'
  controller :pages do
    get :test
    get :another_test
    get :to_do_list
  end
end
