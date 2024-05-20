
class ContactsApi
    BASE_URL = 'http://127.0.0.1:8000' # Replace with the base URL of the external API
  
    def initialize
      @connection = Faraday.new(url: BASE_URL) do |conn|
        conn.request :url_encoded
        conn.response :logger # This logs requests and responses to the console, useful for debugging
        conn.adapter Faraday.default_adapter
        conn.headers['Content-Type'] = 'application/json'
      end
    end
  
    def fetch_contacts
      response = @connection.get('/api/contacts/?format=json') # Replace with the actual endpoint
      if response.success?
        JSON.parse(response.body)
      else
        { error: "Unable to fetch data: #{response.status}" }
      end
    end
  end
  