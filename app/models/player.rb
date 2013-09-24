class Player < ActiveRecord::Base
 has_many :games, through: :games_players
 validates :nickname, :uniqueness => :true
end
