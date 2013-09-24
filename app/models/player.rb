class Player < ActiveRecord::Base
 has_many :games
 validates :nickname, :uniqueness => :true
end
