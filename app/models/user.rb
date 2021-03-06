class User < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_token

  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  has_many :comments, dependent: :destroy

  has_many :kudos_given,
    class_name: "Kudo",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy

  has_many :drawings, dependent: :destroy
  has_many :liked_drawings, through: :kudos_given, source: :drawing, dependent: :destroy

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_token!
    token = SecureRandom.urlsafe_base64(16)
    self.update!(session_token: token)
    token
  end

  private
  def ensure_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
