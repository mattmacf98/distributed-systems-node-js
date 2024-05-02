#!/usr/bin/env node

const DatabaseReconnection = require('./db.js');
const db = new DatabaseReconnection({
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'dbconn',
    retry: 1_000
});
db.connect();
db.on('error', (err) => console.error('db error', err.message));
db.on('reconnect', () => console.log('reconnecting...'));
db.on('connect', () => console.log('connect'));
db.on('disconnect', () => console.log('disconnected'));

const server = require('fastify')();

server.get('/foo/:foo_id', async (req, res) => {
    try {
        let dbRes = await db.query('SELECT NOW() AS time, $1 AS echo', [req.params.foo_id]);
        return dbRes.rows[0];
    } catch (e) {
        res.statusCode = 503;
        return e;
    }
});

server.get('/health', async (req, res) => {
    if (!db.connected) {
        throw new Error('no db connection');
    }
    return 'OK';
});

server.listen(3000, () => console.log('localhost:3000'));
