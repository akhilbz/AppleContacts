class ListsController < ApplicationController
    def index
        @list = List.all
        render json: {
            list: @list,
        }
    end

    def show
        @list = List.find(params[:id])
        @contacts = @list.contacts

        render json: {
            list: @list,
            contacts: @contacts
        }
    end
end