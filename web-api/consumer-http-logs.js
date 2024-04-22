#!/usr/bin/env node

const server = require('fastify')();
const fetch = require('node-fetch');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || '127.0.0.1:4000';
const log = require("./logstash");

(async () => {
    await server.register(require('middie'));

    server.use((req, res, next) => {
       log('info', 'request-incoming', {
          path: req.url,
          method: req.method,
          ip: req.ip,
          ua: req.headers['user-agent'] || null
       });
       next();
    });

    server.setErrorHandler(async (error, req) => {
       log('error', 'request-failure', {
           stack: error.stack,
           path: req.url,
           method: req.method
       });

       return {error: error.message}
    });

    server.get('/', async () => {
        const url = `http://${TARGET}/recipes/42`;
        log('info', 'request-outgoing', {url, svc: 'recipe-api'});
        const res = await fetch(url);
        const producer_data = await res.json();

        return {
            consumer_pid: process.pid,
            producer_data: producer_data
        };
    });

    server.get('/error', async () => {throw new Error('oh no')})

    server.listen(PORT, HOST, () => {
        log('verbose', 'listen', {host: HOST, port: PORT});
    })
})();

