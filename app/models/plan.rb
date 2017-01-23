class Plan < ActiveRecord::Base
  #Active Record Assocation in rails for more info
  has_many :users
end