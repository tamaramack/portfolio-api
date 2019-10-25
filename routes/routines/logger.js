/**
 * logger js file created by Tamara G. Mack on 21-Oct-19 for portfolio-api
 */
var fs = require('fs');
var path = require('path');
var util = require('util');

const {Console} = require('console');
const {
  createWriteStream,
  WriteStream,
  openSync,
  closeSync,
} = fs;
const {promisify} = util;

const outFile = path.join(__dirname, '../../bin/.store/stdout.log');
const errFile = path.join(__dirname, '../../bin/.store/stderr.log');
const streamOpt = {emitClose: true, flags: 'a'};
try {
  let openOut = openSync(outFile, 'wx');
  let openErr = openSync(errFile, 'wx');
  closeSync(openOut);
  closeSync(openErr);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.error('File already exists');
  } else {
    console.error(err);
  }
}
const writeOut = createWriteStream(outFile, streamOpt);
const writeErr = createWriteStream(errFile, streamOpt);
const {stdout, stderr} = process;
const inspectOptions = {
  colors: true,
  depth: 3,
  showProxy: true,
  getters: true
};

const options = {
  stdout,
  stderr,
  inspectOptions,
  ignoreErrors: false
};

class ConsoleModule extends Console {
  constructor(label) {
    super(options);
    Object.defineProperties(this, {
      label: {
        value: label || '',
        enumerable: true
      },
      _writeOut: {
        value: writeOut
      }
    })
  }

  warn(...data) {
    super.warn(...data);
    writeToLog(true, this.label, ...data);
  }

  error(...data) {
    super.error(...data);
    writeToLog(true, this.label, ...data);
  }

  log(...data) {
    super.log(...data);
    writeToLog(false, this.label, ...data);
  }

  info(...data) {
    super.info(...data);
    writeToLog(false, this.label, ...data);
  }

  debug(...data) {
    super.debug(...data);
    writeToLog(false, this.label, ...data);
  }

  assert(...data) {
    super.assert(...data);
    writeToLog(false, this.label, ...data);
  }

  dir(...data) {
    super.dir(...data);
    writeToLog(false, this.label, ...data);
  }

  dirxml(...data) {
    super.dirxml(...data);
    writeToLog(false, this.label, ...data);
  }

  table(...data) {
    super.table(...data);
    writeToLog(false, this.label, ...data);
  }

  trace(...data) {
    super.trace(...data);
    writeToLog(false, this.label, ...data);
  }
}

module.exports = ConsoleModule;

const primitives = ['string', 'number', 'boolean', 'undefined', 'null'];
function writeToLog(isErr, label, ...data) {
  let stringified = (new Date()).toJSON();
  if (label.length) stringified += `::${label}`;
  while (data.length) {
    const item = data.shift();
    if (!primitives.includes(typeof item)) {
      stringified += `    ${JSON.stringify(item)}`;
      continue;
    }
    stringified += `    ${item}`;
  }
  stringified = stringified.replace(/\n/gm, '  ') + '\n';
  if (isErr) writeErr.write(stringified);
  else writeOut.write(stringified);
}
