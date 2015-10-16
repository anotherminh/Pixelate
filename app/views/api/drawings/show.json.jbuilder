json.extract!(@drawing, :id, :title, :size, :content, :data_url, :user_id, :kudos)
json.username @drawing.user.username
