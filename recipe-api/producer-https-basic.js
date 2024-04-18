#!/usr/bin/env node

const fs = require('fs');
const server = require('fastify')({
    https: {
        key: fs.readFileSync(__dirname+'/tls/producer-private-key.key'),
        cert: fs.readFileSync(__dirname+'/../shared/tls/producer-certificate.cert')
    }
});
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

console.log(`worker pid=${process.pid}`);

server.get('/recipes/:id', async (req, res) => {
   console.log(`worker request pid=${process.pid}`);
   const id = Number(req.params.id);

   if (id !== 42) {
       res.statusCode = 404;
       return { error: 'not_found' }
   }

   return {
       producer_pid: process.pid,
       recipe: {
           id: id,
           name: "Chicken Tikka Masala",
           steps: "Throw it in a pot...",
           ingredients: [
               {id:1, name: "Chicken", quantity: "1 lb"},
               {id:2, name: "Sauce", quantity: "2 cups"},
           ]
       }
   }
});

server.listen(PORT, HOST, () => {
    console.log(`Producer running at https://${HOST}:${PORT}`);
})
