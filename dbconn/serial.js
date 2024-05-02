#!/usr/bin/env node

// SERIAL
// const { Client } = require('pg');
// const db = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'user',
//     password: 'password',
//     database: 'dbconn'
// });
// db.connect();
//
// (async () => {
//     const start = Date.now();
//     await Promise.all(
//         [
//             db.query("SELECT pg_sleep(2);"),
//             db.query("SELECT pg_sleep(2);")
//         ]);
//     console.log(`took ${(Date.now() - start) / 1000} seconds`);
//     db.end();
// })();


// POOL
const { Pool } = require('pg');
const db = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'dbconn',
    max: 10
});
db.connect();

(async () => {
    const start = Date.now();
    await Promise.all(
        [
            db.query("SELECT pg_sleep(2);"),
            db.query("SELECT pg_sleep(2);")
        ]);
    console.log(`took ${(Date.now() - start) / 1000} seconds`);
    db.end();
})();
