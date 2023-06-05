const env = process.env.NODE_ENV || 'development';
const configFile = `./${env}.js`;

module.exports = require(configFile);
