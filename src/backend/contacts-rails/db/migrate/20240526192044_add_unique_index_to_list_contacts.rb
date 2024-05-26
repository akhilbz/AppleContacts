class AddUniqueIndexToListContacts < ActiveRecord::Migration[7.0]
  def change
    add_index :list_contacts, [:list_id, :contacts_id], unique: true
  end
end
