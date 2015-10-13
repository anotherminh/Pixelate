class Drawing < ActiveRecord::Base
  validates :title, :content, :size, presence: true;
end
