class Drawing < ActiveRecord::Base
  validates :title, :content, :size, :user_id, presence: true;

  belongs_to :user
  has_many :kudos
  has_many :kudos_givers, through: :kudos, source: :user
  has_many :comments
end
