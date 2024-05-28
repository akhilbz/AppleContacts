class ListsController < ApplicationController
    
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
        @list = List.find(params[:id])
        @contacts = @list.contacts

        render json: {
            list: @list,
            contacts: @contacts
        }
    end

    private 
    def list_params
        params.require(:list).permit(:name)
    end
end