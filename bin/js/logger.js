/**
 * logger js file created by Tamara G. Mack on 21-Oct-19 for portfolio-api
 */
var fs = require('fs');
var path = require('path');
var util = require('util');

const {
  createWriteStream,
  WriteStream,
  openSync,
  closeSync,
} = fs;
const {promisify} = util;

const outFile = path.join(__dirname, '../.store/stdout.log');
const errFile = path.join(__dirname, '../.store/stderr.log');
const streamOpt = {emitClose: true};
try {
  let openOut = openSync(outFile, 'wx');
  let openErr = openSync(errFile, 'wx');
  closeSync(openOut);
  closeSync(openErr);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.error('File already exists');
  }
  console.error(err);
}

module.exports = () => {
  const {Console} = require('console');
  const stdout = createWriteStream(outFile, streamOpt);
  const stderr = createWriteStream(errFile, streamOpt);
  const inspectOptions = {
    colors: true,
    depth: 3,
    showProxy: true,
    getters: true,
  };

  const options = {
    stdout,
    stderr,
    inspectOptions,
  };

  // app.use(logger('combined', { stream: stdout }));
  return new Console(options);
};
