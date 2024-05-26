class ChangeForeignKeyDueToError < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :list_contacts, :contacts_contact
    add_foreign_key :list_contacts, :contacts_contact, column: :contact_id
  end
end
