#!/usr/bin/env node

const server = require('fastify')();
const fetch = require('node-fetch');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || '127.0.0.1:4000';
const SDC = require('statsd-client');
const statsd = new SDC({host: '127.0.0.1', port: 8125, prefix: 'web-api'});

(async () => {
    await server.register(require('middie'));

    server.use(statsd.helpers.getExpressMiddleware('inbound', {timeByUrl: true}));

    server.get('/', async () => {
        const begin = new Date();
        const res = await fetch(`http://${TARGET}/recipes/42`);
        statsd.timing('outbound.recipe-api.request-time', begin);

        statsd.increment('outbound.recipe-api.request-count', 1);

        const producer_data = await res.json();

        return {
            consumer_pid: process.pid,
            producer_data: producer_data
        };
    });

    server.get('/error', async () => {throw new Error('oh no')})

    server.listen(PORT, HOST, () => {
        console.log(`Consumer running at http://${HOST}:${PORT}`)
    })
})();


const v8 = require('v8');
const fs = require('fs');

setInterval(() => {
    statsd.gauge('server.conn', server.server._connections);

    const m = process.memoryUsage();
    statsd.gauge('server.memory.used', m.heapUsed);
    statsd.gauge('server.memory.limit', m.heapTotal);

    const h = v8.getHeapStatistics();
    statsd.gauge('server.heap.size', h.used_heap_size);
    statsd.gauge('server.heap.limit', h.heap_size_limit);

    fs.readdir('/proc/self/fd', (err, list) => {
        if (err) return;
        statsd.gauge('server.descriptors', list.length);
    });

    const begin = new Date();
    setTimeout(() => {statsd.timing('eventLag', begin);}, 0);
}, 10_000)
