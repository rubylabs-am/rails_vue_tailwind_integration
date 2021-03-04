Rails.application.routes.draw do
  root to: 'pages#index'
  controller :pages do
    get :test
    get :another_test
    get :todo_list
  end

  resources :todo_lists do
    resources :todo_items
  end
end
