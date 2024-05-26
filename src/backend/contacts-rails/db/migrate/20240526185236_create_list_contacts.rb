class CreateListContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :list_contacts do |t|
      t.references :list, null: false, foreign_key: true
      t.references :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
