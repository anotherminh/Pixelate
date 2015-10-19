json.extract! @comment, :body, :user_id, :id
json.author @comment.user.username
json.created_at @comment.created_at.strftime("Posted on %m/%d/%Y %I:%M%p")
