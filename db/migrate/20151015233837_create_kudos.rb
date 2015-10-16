class CreateKudos < ActiveRecord::Migration
  def change
    create_table :kudos do |t|
      t.integer :user_id, null: false, index: true
      t.integer :drawing_id, null: false, index: true
    end

    add_index :kudos, [:user_id, :drawing_id], unique: true
  end
end
