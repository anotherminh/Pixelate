json.user_matches do
  json.array!(@user_matches) do |user|
    json.extract! user, :id, :username
    json.created_at user.created_at.strftime("%m/%d/%Y %I:%M%p")
    json.drawing user.drawings[0].data_url
  end
end


json.drawing_matches do
  json.array!(@drawing_matches) do |drawing|
    json.extract! drawing, :id, :title, :data_url
    json.username drawing.user.username
  end
end
