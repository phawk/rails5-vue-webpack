class Contact < ApplicationRecord
  validates :first_name, :last_name, presence: true
end
