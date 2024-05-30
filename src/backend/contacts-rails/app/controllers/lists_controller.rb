class ListsController < ApplicationController
    before_action :set_list, only: [:show, :empty]

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
        ListContact.where(list_id: @list.id).destroy_all
        render json: { message: 'List Cleared Successfully' }, status: :ok
    rescue => e
        render json: { error: e.message }, status: :unprocessable_entity
    end
        
    private 

    def set_list
        @list = List.find(params[:id])
    end
      
    def list_params
        params.require(:list).permit(:name)
    end
end