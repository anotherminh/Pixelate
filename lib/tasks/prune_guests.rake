task prune_guests: :environment do
  guests = User.where('users.username LIKE ?', "sample_user_%")
  guests.each do |guest|
    guest.destroy
  end
end
