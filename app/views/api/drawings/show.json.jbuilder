json.extract!(@drawing, :id, :title, :size, :content, :data_url, :user_id, :kudos, :comments)

json.comments do
  json.array! @drawing.comments do |comment|
    json.body comment.body
    json.author comment.user.username
  end
end
