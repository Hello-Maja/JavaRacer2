class CreatePlayersGames < ActiveRecord::Migration
  def change
    create_table :players_games do |t|
      t.integer :game_id
      t.integer :player_id
    end
  end
end
