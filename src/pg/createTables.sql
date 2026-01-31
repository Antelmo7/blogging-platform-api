CREATE TABLE IF NOT EXISTS posts(
  post_id serial PRIMARY KEY,
  title varchar(50),
  content text,
  category varchar(30),
  tags json,
  createdAt timestamp not null default CURRENT_TIMESTAMP
);