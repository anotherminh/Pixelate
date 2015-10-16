bot = User.create!(username: "i_am_a_bot", password: "password")
grey = User.create!(username: "mrgreyscale", password: "password")
mew = User.create!(username: "MeowMeow", password: "password")
user = User.create!(username: "user", password: "password")

GREYSCALE = %w(
  #999999
  #777777
  #555555
  #333333
  #111111
)

OLD_SCHOOL = %w(
  Navy
  Blue
  Aqua
  Teal
  Olive
  Green
  Lime
  Yellow
  Orange
  Red
  Maroon
  Fuchsia
  Purple
  Silver
  Gray
  Black
)

MORE_COLORS = %w(
  #1ebaff
  #baff1e
  #ffff00
  #fafafa
  #b2b2b2
  #cccccc
  #4c4c4c
  #000000
  #e60000
  #cd0000
  #0000cc
  #0000e6
  #ff8c19
  #ff8000
  #9bbc57
  #00e600
  #00cc00
  #00ff00
  #0000ff
  #00ffff
  #ff0000
  #ee82ee
  #ffc0cb
  #e6ffcc
  #ffffcc
  #ccccff
  #78ff00
  #0078ff
  #c8d400
  #01f5d1
  #2a934b
  #bd702f
  #c62104
  #e31912
  #ff7373
  #ff0067
  #baff1e
  #bbbbaa
  #bbaaee
  #facade
  #f5f5ed
  #faf9f7
)

METRO = %w(
  #00aba9
  #ff0097
  #a200ff
  #1ba1e2
  #f09609
)

grey_content = []
more_colors = []
metro = []

5.times do
  content = []
  2500.times do
    content << OLD_SCHOOL.sample
  end

  user.drawings.create!(title: OLD_SCHOOL.sample, size: 50, content: content)
end

8.times do
  content = []
  2500.times do
    content << GREYSCALE.sample
  end

  grey.drawings.create!(title: GREYSCALE.sample, size: 50, content: content)
end

10.times do
  content = []
  2500.times do
    content << METRO.sample
  end

  meow.drawings.create!(title: METRO.sample, size: 50, content: content)
end

20.times do
  content = []
  2500.times do
    content << MORE_COLORS.sample
  end
  bot.drawings.create!(title: MORE_COLORS.sample, size: 50, content: content)
end
