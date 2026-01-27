import { Client } from "pg";

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

await client.connect();

export async function selectTable(table) {
  const res = await client.query(`SELECT * FROM ${table}`);
  const data = res.rows;

  return data;
}