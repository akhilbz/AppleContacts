json.extract! contact, :id, :full_name, :company, :photo_path, :phone_no, :email, :created_at, :updated_at
json.url contact_url(contact, format: :json)
