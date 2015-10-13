class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.string :title, null: false
      t.integer :size, null: false
      t.text :content, null: false

      t.timestamps null: false
    end
  end
end
