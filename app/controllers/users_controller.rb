class UsersController < ApplicationController
  
  # GET request /users/:id
  def show
    @user = User.find( params[:id] )
  end
  
end
