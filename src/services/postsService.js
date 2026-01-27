import { Client } from "pg";

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

await client.connect();

export async function createPost({
  title,
  content,
  category
}) {
  const text = 'INSERT INTO posts(title, content, category) VALUES ($1, $2, $3) RETURNING *';
  const values = [title, content, category];

  const res = await client.query(text, values);
  const data = res.rows;

  return data[0];
}

export async function updatePost({
  id,
  title,
  content,
  category
}) {
  const text = 'UPDATE posts SET title = $2, content = $3, category=$4 WHERE post_id = $1 RETURNING *';
  const values = [id, title, content, category];

  const res = await client.query(text, values);
  const data = res.rows;

  return data[0];
}

export async function deletePost({
  id,
}) {
  const text = 'DELETE FROM posts WHERE post_id = $1';
  const values = [id];

  const res = await client.query(text, values);

  return true;
}

export async function getPostById({
  id,
}) {
  const text = 'SELECT * FROM posts WHERE post_id = $1';
  const values = [id];

  const res = await client.query(text, values);
  const data = res.rows;

  return data[0];
}

export async function getPosts({ term = null }) {
  if (term) {
    const text = 'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 OR category ILIKE $1';
    const values = [`%${term}%`];

    const res = await client.query(text, values);
    const data = res.rows;

    return data;
  } else {
    const res = await client.query('SELECT * FROM posts');
    const data = res.rows;

    return data;
  }
}