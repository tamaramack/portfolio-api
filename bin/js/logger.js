/**
 * logger js file created by Tamara G. Mack on 21-Oct-19 for portfolio-api
 */
var fs = require('fs');

const outFile = './bin/.store/stdout.log';
const errFile = './bin/.store/stderr.log';
const streamOpt = { emitClose: true };
const openFileCb = (file) => (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error(`${ file } already exists`);
      return;
    }

    throw err;
  }
  fs.close(fd, () => {});
};

fs.open(outFile, 'wx', openFileCb(outFile));
fs.open(errFile, 'wx', openFileCb(errFile));

module.exports = (() => {
  const {Console} = require('console');
  const stdout = fs.createWriteStream(outFile, streamOpt);
  const stderr = fs.createWriteStream(errFile, streamOpt);
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
  return new Console(options);
});
