class CreateAudios < ActiveRecord::Migration[5.2]
  def change
    create_table :audios do |t|
      t.string :audio
      t.string :title
      t.integer :genre_id
      t.integer :user_id

      t.timestamps
    end
  end
end
