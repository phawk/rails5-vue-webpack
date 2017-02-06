require_dependency "route_constraints/non_api"
Rails.application.routes.draw do
  scope path: "api", format: "json" do
    resources :contacts
  end

  root 'root#index'

  match "*path", to: "root#index", via: :all, constraints: RouteConstraints::NonApi
end
