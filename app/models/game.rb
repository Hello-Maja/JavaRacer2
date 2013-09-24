class Game < ActiveRecord::Base
  has_many :players, through: :games_players
end
