json.array!(@drawings) do |drawing|
  json.extract!(drawing, :id, :title, :size, :content, :data_url)
end
