json.extract! @comment, :body, :user_id, :id
json.author @comment.user.username
