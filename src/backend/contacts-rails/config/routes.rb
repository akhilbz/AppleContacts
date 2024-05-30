Rails.application.routes.draw do
  resources :contacts
  resources :lists do 
    member do
      delete 'empty'
    end
  end  

  post 'upload-vcf', to: 'vcf#upload'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
