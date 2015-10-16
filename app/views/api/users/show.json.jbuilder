json.extract!(@user, :username, :drawings, :liked_drawings)

json.drawings do
  json.array! @user.drawings do |drawing|
    json.extract! drawing, :id, :user_id, :title, :size, :content, :data_url
    json.kudos drawing.kudos
  end
end
