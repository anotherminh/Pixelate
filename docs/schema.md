# Schema Information

## user
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
username       | string    | not null
password_digest| text      | not null
session_token  | integer   | not null, foreign key, indexed

## drawings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
size        | integer   | not null
title       | string    | not null
content     | text      | not null
data_url    | text      |

## kudos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
drawing_id  | string    | not null, foreign key (references notes), indexed

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key, indexed
drawing_id  | integer   | not null, foreign key, indexed
body        | text      | not null
