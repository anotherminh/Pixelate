class Kudo < ActiveRecord::Base
  validates :user_id, :drawing_id, presence: true;
  validates :user_id, uniqueness: { scope: :drawing_id }

  belongs_to :user
  belongs_to :drawing
end
