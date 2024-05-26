namespace :populate_list_contacts do
    desc "Create mappings between the only list and all contacts"
    task create_list_contacts_mapping: :environment do
      list = List.first # Assuming you have only one list object
      contacts = Contact.all
  
      contacts.each do |contact|
        unless ListContact.exists?(list_id: list.id, contact_id: contact.id)
          ListContact.create(list_id: list.id, contact_id: contact.id)
        end
      end
  
      puts "Mappings created between the only list and all contacts."
    end
  end
  