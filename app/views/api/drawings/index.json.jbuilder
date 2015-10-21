json.all_drawings_count Drawing.all.count

json.drawings do
  json.array!(@drawings) do |drawing|
    json.extract!(drawing, :id, :title, :size, :content, :data_url, :user_id, :kudos)
  end
end
