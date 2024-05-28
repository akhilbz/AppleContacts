# config/initializers/cors.rb

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#     allow do
#       origins 'http://localhost:3001/' # Replace with the origin you want to allow. You can use '*' to allow all origins, but it's not recommended for production.
  
#       resource '*',
#         headers: :any,
#         methods: :any,
#         credentials: true
#     end
#   end
  

Rails.application.config.middleware.insert_before 0, Rack::Cors do  
  allow do
    origins '*'
    resource '*', headers: :any, expose: %w[access-token expiry token-type uid client], methods: %i[get post put patch delete options head] #, credentials: true
  end
end