class Comment < ActiveRecord::Base
  validates :body, :user_id, :drawing_id, presence: true;
  belongs_to :user
  belongs_to :drawing
end
