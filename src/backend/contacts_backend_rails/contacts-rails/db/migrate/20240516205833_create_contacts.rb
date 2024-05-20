class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.json :full_name, default: []
      t.string :company
      t.string :photo_path
      t.json :phone_no, default: { cell: [], home: [], pref: [] }
      t.json :email, default: { home: [], internet: [] }

      t.timestamps
    end
  end
end
