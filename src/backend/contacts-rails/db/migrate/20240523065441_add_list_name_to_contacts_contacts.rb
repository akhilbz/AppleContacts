class AddListNameToContactsContacts < ActiveRecord::Migration[7.0]
  def change
    add_column :contacts_contact, :list_name, :string
  end
end
