# lib/tasks/fetch_contacts.rake

namespace :fetch_contacts do
    desc "Fetch contacts from external API and store in the database"
    task fetch_and_store: :environment do
      api_service = ContactsApi.new
      contacts = api_service.fetch_contacts
  
      if contacts.is_a?(Hash) && contacts['error']
        puts "Error fetching contacts: #{contacts['error']}"
      else
        contacts.each do |contact_data|
          Contact.create!(
            full_name: contact_data['full_name'],
            company: contact_data['company'],
            photo_path: contact_data['photo_path'],
            phone_no: contact_data['phone_no'],
            email: contact_data['email']
          )
        end
        puts "Contacts successfully fetched and stored."
      end
    end
  end
  