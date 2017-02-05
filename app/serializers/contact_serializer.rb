class ContactSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :avatar_url
end
