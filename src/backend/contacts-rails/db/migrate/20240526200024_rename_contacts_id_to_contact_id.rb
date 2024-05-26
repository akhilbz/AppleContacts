class RenameContactsIdToContactId < ActiveRecord::Migration[7.0]
  def change
    rename_column :list_contacts, :contacts_id, :contact_id
  end
end
