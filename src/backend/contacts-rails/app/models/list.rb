class List < ApplicationRecord
    validates :name, presence: true
    has_many :list_contacts
    has_many :contacts, through: :list_contacts
end
