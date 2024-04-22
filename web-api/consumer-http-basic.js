#!/usr/bin/env node

const server = require('fastify')();
const fetch = require('node-fetch');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || '127.0.0.1:4000';

server.get('/', async () => {
   const res = await fetch(`http://${TARGET}/recipes/42`);
   const producer_data = await res.json();

   return {
       consumer_pid: process.pid,
       producer_data: producer_data
   };
});

server.listen(PORT, HOST, () => {
    console.log(`Consumer running at http://${HOST}:${PORT}`)
})
