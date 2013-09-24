class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.time    :start_time
      t.time    :end_time
      t.time    :race_duration
      t.string  :url
      t.integer :winner_id
      t.timestamps
    end
  end
end
