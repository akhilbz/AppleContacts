class Contact < ApplicationRecord
  has_many :list_contacts
  has_many :lists, through: :list_contacts
  
  self.table_name = 'contacts_contact'
    private
  def contact_params
    params.require(:contac).permit(
      full_name: [],
      company: "",
      photo_path: "",
      phone_no: [:cell, :home, :pref],
      email: [:home, :internet]
    )
  end

end
