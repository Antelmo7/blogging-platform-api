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
  category,
  tags
}) {
  try {
    const text = 'INSERT INTO posts(title, content, category, tags) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, content, category, JSON.stringify(tags)];

    const res = await client.query(text, values);
    const data = res.rows;

    return data[0];
  } catch (error) {
    throw new Error('Error saving post');
  }
}

export async function updatePost({
  id,
  title,
  content,
  category,
  tags
}) {
  try {
    const text = 'UPDATE posts SET title = $2, content = $3, category=$4, tags=$5 WHERE post_id = $1 RETURNING *';
    const values = [id, title, content, category, JSON.stringify(tags)];

    const res = await client.query(text, values);
    const data = res.rows;

    return data[0];
  } catch (error) {
    throw new Error('Error updating post');
  }
}

export async function deletePost({
  id,
}) {
  try {
    const text = 'DELETE FROM posts WHERE post_id = $1';
    const values = [id];

    await client.query(text, values);
  } catch (error) {
    throw new Error('Error deleting post');
  }
}

export async function getPostById({
  id,
}) {
  try {
    const text = 'SELECT * FROM posts WHERE post_id = $1';
    const values = [id];

    const res = await client.query(text, values);
    const data = res.rows;

    return data[0];
  } catch (error) {
    throw new Error('Error fetching post');
  }
}

export async function getPosts({ term = null }) {
  try {
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
  } catch (error) {
    throw new Error('Error fetching posts');
  }
}