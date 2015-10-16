# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151016205921) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "drawing_id", null: false
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["drawing_id"], name: "index_comments_on_drawing_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "drawings", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "size",       null: false
    t.text     "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.text     "data_url"
  end

  add_index "drawings", ["user_id"], name: "index_drawings_on_user_id", using: :btree

  create_table "kudos", force: :cascade do |t|
    t.integer "user_id",    null: false
    t.integer "drawing_id", null: false
  end

  add_index "kudos", ["drawing_id"], name: "index_kudos_on_drawing_id", using: :btree
  add_index "kudos", ["user_id", "drawing_id"], name: "index_kudos_on_user_id_and_drawing_id", unique: true, using: :btree
  add_index "kudos", ["user_id"], name: "index_kudos_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
