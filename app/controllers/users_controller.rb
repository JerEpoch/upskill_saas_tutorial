class UsersController < ApplicationController
  before_action :authenticate_user!
  
  # GET request /users/:id
  def show
    @user = User.find( params[:id] )
  end
  
end
