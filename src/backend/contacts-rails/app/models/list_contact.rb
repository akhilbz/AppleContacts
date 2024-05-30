class ListContact < ApplicationRecord 
    belongs_to :list # refers to the list model
    belongs_to :contact # refers to the contact model
    validates :list_id, uniqueness: { scope: :contact_id }
end