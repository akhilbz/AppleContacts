class ListsController < ApplicationController
    before_action :set_list, only: [:show, :empty, :destroy]

    def index
        @list = List.all
        render json: {
            list: @list,
        }
    end

    def create
        Rails.logger.info "Params: #{params.inspect}"   
        @list = List.new(list_params)
        if @list.save
            render json: @list, status: :created
        else
            render json: @list.errors, status: :unprocessable_entity
        end
    end

    def show
        # @list = List.find(params[:id])
        @contacts = @list.contacts

        render json: {
            list: @list,
            contacts: @contacts
        }
    end

    def empty
        list_contacts = ListContact.where(list_id: @list.id)
        list_contacts.each do |list_contact| 
            Contact.find(list_contact.contact_id).destroy
            list_contact.destroy
        end
        render json: { message: 'List Cleared Successfully' }, status: :ok
    rescue => e
        render json: { error: e.message }, status: :unprocessable_entity
    end

    def destroy
        if @list.destroy
          render json: { message: 'List deleted successfully' }, status: :ok
        else
          render json: { error: 'Failed to delete the list' }, status: :unprocessable_entity
        end
      end
        
    private 

    def set_list
        @list = List.find(params[:id])
        rescue ActiveRecord::RecordNotFound
            render json: { error: 'List not found' }, status: :not_found
    end
      
    def list_params
        params.require(:list).permit(:name)
    end
end