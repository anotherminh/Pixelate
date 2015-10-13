class AddUserIdToDrawings < ActiveRecord::Migration
  def change
    add_column :drawings, :user_id, :integer
    add_index :drawings, :user_id
  end
end
