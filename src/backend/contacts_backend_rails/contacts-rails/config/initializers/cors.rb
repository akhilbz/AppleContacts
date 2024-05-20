# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'localhost:3001' # Replace with the origin you want to allow. You can use '*' to allow all origins, but it's not recommended for production.
  
      resource '*',
        headers: :any,
        methods: [:get],
        credentials: true
    end
  end
  