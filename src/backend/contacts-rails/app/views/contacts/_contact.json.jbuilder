json.extract! contact, :id, :full_name, :company, :photo_path, :phone_no, :email
json.url contact_url(contact, format: :json)
