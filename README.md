# blogging-platform-api
Simple RESTful API with basic CRUD operations for a personal blogging platform.

## Installation and use
1. Clone the repository from GitHub using `git clone https://github.com/Antelmo7/blogging-platform-api`
2. Change to the new folder and run `npm install`
3. Create a .env file with the template from .env-example file and fill the variables with your credentiales from postgresql
4. Run `npm run dev`

```json
POST /posts
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}

PUT /posts/1
{
  "title": "My Updated Blog Post",
  "content": "This is the updated content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}

DELETE /posts/1

GET /posts/1

GET /posts

GET /posts?term=tech

```

The term query param will search on title, content and category

## Tech Stack
- Node.js
- Express.js
- express-rate-limit

## Explanation
**PostgreSQL**
To connect to PG Database install pg client with `npm install pg`, then create a new client and use the env variables to connect to the database.

```javascript
import { Client } from "pg";

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

await client.connect();
```

To execute queries pg use something called **paramethized query** instead of concatening parameters into the query text directly because this can lead to sql injections.

`RETURNING *` will return the new post.

```javascript
const text = 'INSERT INTO posts(title, content, category, tags) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, content, category, JSON.stringify(tags)];

    const res = await client.query(text, values);
```

To search a term ignoring lower or uppercase you can use `ILIKE` from pg

```javascript
const text = 'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 OR category ILIKE $1';
const values = [`%${term}%`];

const res = await client.query(text, values);
```
**Tags array**

To save the Array of tags I used a JSON column in PostgreSQL and sending the array using `JSON.stringify(tags)` to save it, the database will return it like an object.

**Validating properties**

To validate a post we have to check each prop
- No null
- No undefined
- No empty strings
- And no empty arrays

```javascript
export default function validatePost(post) {
  if (!post) return false;

  const props = ['title', 'content', 'category', 'tags'];

  return props.every(prop => {
    const value = post[prop];

    if (!(prop in post)) return false;

    if (value === null || value === undefined) return false;

    // empty strings
    if (typeof value === 'string' && value.trim() === '') return false;

    // tags array
    if (prop === 'tags' && (!Array.isArray(value) || value.length === 0)) return false;

    return true;
  });
}
```

Solution for the [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api) fom [roadmap.sh](https://roadmap.sh)