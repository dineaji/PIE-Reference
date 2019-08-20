`use strict`;

const winston = require('winston');

const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = './logs';
const tsFormat = () => (new Date()).toLocaleTimeString();

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

var logger = new(winston.Logger)({
  transports: [
    new(require('winston-daily-rotate-file'))({
      // timestamp: tsFormat,
      name: 'info-file',
      filename: `${logDir}/-server.log`,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'verbose' : 'info'
    }),
    new(require('winston-daily-rotate-file'))({
      // timestamp: tsFormat,
      name: 'error-file',
      filename: `${logDir}/-error.log`,
      level: 'error'
    })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (env !== 'production') {
  logger.add(winston.transports.Console);
}

module.exports = logger
