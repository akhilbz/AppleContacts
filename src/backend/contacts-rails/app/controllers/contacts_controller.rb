class ContactsController < ApplicationController
  before_action :set_contact, only: %i[ show edit update destroy ]

  # GET /contacts or /contacts.json
  def index
    @contacts = Contact.all
  end

  # GET /contacts/1 or /contacts/1.json
  def show
  end

  # GET /contacts/new
  def new
    @contact = Contact.new
  end

  # GET /contacts/1/edit
  def edit
  end

  # POST /contacts or /contacts.json
  def create
    @contact = Contact.new(contact_params)
    list_id = params[:list_id]
  
    if @contact.save
      if list_id.present?
        ListContact.create(list_id: list_id, contact_id: @contact.id)
      end
      render json: @contact
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contacts/1 or /contacts/1.json
  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contacts/1 or /contacts/1.json
  def destroy
    list_id = params[:list_id]
    if list_id.present?
      ListContact.where(list_id: list_i, contact_id: @contact.id).destroy_all
    end
    if @contact.destroy
      head :no_content
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    private
    def contact_params
      params.require(:contact).permit(
        :company,
        :photo_path,
        full_name: [],
        phone_no: [:cell, :home, :pref],
        email: [:home, :internet]
      ).tap do |whitelisted|
        whitelisted[:phone_no] = {
          cell: (params[:contact][:phone_no][:cell]) || [],
          home: (params[:contact][:phone_no][:home]) || [],
          pref: (params[:contact][:phone_no][:pref]) || []
        }
        
        whitelisted[:email] = {
          home: (params[:contact][:email][:home]) || [],
          internet: (params[:contact][:email][:internet]) || []
        }
        
        Rails.logger.debug "Value of list id: #{params[:contact][:full_name]}"
      end
    end

end
