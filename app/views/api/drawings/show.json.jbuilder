json.extract!(@drawing, :id, :title, :size, :content, :data_url, :user_id, :kudos, :comments)

json.username @drawing.user.username

json.comments do
  json.array! @drawing.comments do |comment|
    json.body comment.body
    json.author comment.user.username
    json.user_id comment.user_id
    json.id comment.id
  end
end
