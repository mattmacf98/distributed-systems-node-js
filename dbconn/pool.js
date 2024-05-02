#!/usr/bin/env node

const { Pool } = require('pg');
const db = new Pool({
   host: 'localhost',
   port: 5432,
   user: 'user',
   password: 'password',
   database: 'dbconn',
   max: process.env.MAX_CONN || 10
});
db.connect();

const server = require('fastify')();

server.get('/', async () => {
    let dbRes = await db.query("SELECT NOW() AS time, 'world' AS hello");
    return dbRes.rows[0];
});

server.listen(3000, () => console.log('http://localhost:3000'));
