class ChangeForeignKeyAgain < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :list_contacts, :contacts_contact, column: :contact_id
  end
end
