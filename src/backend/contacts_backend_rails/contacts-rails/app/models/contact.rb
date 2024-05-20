class Contact < ApplicationRecord

    private
  def contact_params
    params.require(:contact).permit(
      full_name: [],
      company: "",
      photo_path: "",
      phone_no: [:cell, :home, :pref],
      email: [:home, :internet]
    )
  end

end
