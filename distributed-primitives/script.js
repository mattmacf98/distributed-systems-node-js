#!/usr/bin/env node

const Redis = require('ioredis');
const redis = new Redis('localhost:6379');

redis.defineCommand("addUser", {
    numberOfKeys: 2,
    lua: require('fs').readFileSync(__dirname + '/add-user.lua')
});

const LOBBY = 'lobby', GAME = 'game';

(async () => {
    console.log(await redis.addUser(LOBBY, GAME, 'alice'));
    console.log(await redis.addUser(LOBBY, GAME, 'bob'));
    console.log(await redis.addUser(LOBBY, GAME, 'cindy'));
    const [gid, players] = await redis.addUser(LOBBY, GAME, 'matt');
    console.log('GAME ID', gid, 'PLAYERS', players.split(','));
    redis.quit();
})();
