#!/usr/bin/env node

const server = require('fastify')();
const fetch = require('node-fetch');
const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.PORT ||'localhost:4000';
const complex_query = `query kitchenSink ($id:ID) {
    recipe(id: $id) {
        id
        name
        ingredients {
            name
            quantity
        }
    }
    pid
}`;

server.get('/', async () => {
    const res = await fetch(`http://${TARGET}/graphql`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: complex_query,
            variables: {id: "42"}
        })
    });

    const producer_data = await res.json();

    return {
        consumer_pid: process.pid,
        producer_data: producer_data
    };
});

server.listen(PORT, HOST, () => {
    console.log(`Consumer running at http://${HOST}:${PORT}`)
})
