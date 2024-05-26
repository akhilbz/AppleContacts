class RemoveListNameColumnFromContactsContacts < ActiveRecord::Migration[7.0]
  def change
    remove_column :contacts_contact, :list_name, :string
  end
end
