class AddDataUrlToDrawings < ActiveRecord::Migration
  def change
    add_column :drawings, :data_url, :text
  end
end
