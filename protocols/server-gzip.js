#!/usr/bin/env node

const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const raw = fs.createReadStream(__dirname + '/index.html');
    const acceptEncoding = req.headers['accept-encoding'] || '';
    console.log(acceptEncoding);

    res.setHeader('Content-Type', 'text/plain');

    if (acceptEncoding.includes('gzip')) {
        console.log('encoding with gzip');
        res.setHeader('Content-Encoding', 'gzip');
        raw.pipe(zlib.createGzip()).pipe(res);
    } else {
        console.log('no encoding');
        raw.pipe(res);
    }
}).listen(process.env.PORT || 1337);

// no encoding: curl http://localhost:1337
// encoding (show binary): curl -H 'Accept-Encoding: gzip' http://localhost:1337 | xxd
// encoding (decompress): curl -H 'Accept-Encoding: gzip' http://localhost:1337 | gunzip
