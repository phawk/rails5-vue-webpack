Rails.application.routes.draw do
  scope path: "api", format: "json" do
    resources :contacts
  end

  root 'pages#home'
end
