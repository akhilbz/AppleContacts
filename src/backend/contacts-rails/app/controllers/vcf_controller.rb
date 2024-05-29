class VcfController < ApplicationController
    require 'rest-client'
    require 'fileutils'
  
    def upload
      file = params[:file]
      list_id = params[:id]

      if file.nil?
        render json: { error: 'No file uploaded' }, status: :bad_request
        return
      end

      if list_id.nil?
        render json: { error: 'No List ID uploaded' }, status: :bad_request
        return
      end
  
      # Define the folder path where the file will be saved using the environment variable
      folder_path = ENV['VCF_FILE_PATH']
      
      # Create the folder if it doesn't exist
      FileUtils.mkdir_p(folder_path) unless File.directory?(folder_path)
  
      # Define the complete file path
      file_path = File.join(folder_path, file.original_filename)
      
      # Save the file
      File.open(file_path, 'wb') do |f|
        f.write(file.read)
      end
  
      begin
        response = RestClient.post('http://127.0.0.1:8000/api/parse-vcf/', { file_name: file.original_filename })
        parsed_data = JSON.parse(response.body)

        Rails.logger.info "Parsed Data: #{response.inspect}"
        puts "Parsed Data: #{parsed_data.inspect}"

        map_contacts_to_list(parsed_data['contacts'], list_id)
  
        render json: { message: 'File processed and mapped successfully', data: parsed_data['contacts'] }, status: :ok
      rescue RestClient::ExceptionWithResponse => e
        render json: { error: 'Error processing file', details: e.response }, status: :internal_server_error
      end
    end
  
    private
  
    def map_contacts_to_list(contacts, list_id)
      # Implement your mapping logic here
      # For example, you could create a new List and associate the parsed contacts with it
      Rails.logger.info "Contacts: #{contacts}"
      contacts.each do |contact|
        unless ListContact.exists?(list_id: list_id, contact_id: contact['id'])
          ListContact.create(list_id: list_id, contact_id: contact['id'])
        end
      end
    end
  end
  