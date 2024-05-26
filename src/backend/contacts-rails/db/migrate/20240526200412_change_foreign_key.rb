class ChangeForeignKey < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :list_contacts, :contacts
    add_foreign_key :list_contacts, :contact, column: :contact_id

  end
end
