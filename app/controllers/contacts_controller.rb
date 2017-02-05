class ContactsController < ApplicationController
  def index
    render json: Contact.all.order(:last_name)
  end

  def show
    render json: Contact.find(params[:id])
  end

  def create
    contact = Contact.new(contact_params)

    if contact.save
      render json: contact
    else
      render json: contact.errors.full_messages, status: 400
    end
  end

  def update
    contact = Contact.find(params[:id])

    if contact.update(contact_params)
      render json: contact
    else
      render json: contact.errors.full_messages, status: 400
    end
  end

  def destroy
    contact = Contact.find(params[:id])
    contact.destroy
  end

  private

  def contact_params
    params.permit(:first_name, :last_name, :email, :phone, :avatar_url)
  end
end
