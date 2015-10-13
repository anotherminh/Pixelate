class Drawing < ActiveRecord::Base
  validates :title, :content, :size, :user_id, presence: true;

  belongs_to :user
end
