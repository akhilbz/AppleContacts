class Contact < ApplicationRecord
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
