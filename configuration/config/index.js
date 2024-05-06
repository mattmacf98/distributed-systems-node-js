const { join } = require('path');
const ENV = process.env.NODE_ENV;

let env_config;
try {
    env_config = require(join(__dirname, `${ENV}.js`));
} catch (e) {
    console.error(`Invalid environment: "${ENV}.js"!`);
    console.error(`Usage: NODE_ENV=<ENV> node app.js`);
    process.exit(1);
}

const default_config = require(join(__dirname, 'default.js'));

module.exports = Object.assign({}, default_config, env_config);
