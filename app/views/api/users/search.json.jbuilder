json.user_matches do
  json.array!(@user_matches) do |user|
    json.extract! user, :id, :username
  end
end


json.drawing_matches do
  json.array!(@drawing_matches) do |drawing|
    json.extract! drawing, :id, :title, :data_url
  end
end
