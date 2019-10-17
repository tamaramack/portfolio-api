#! /usr/bin/env node

const { writeFileSync, readFileSync } = require('fs');
const { execSync } = require('child_process');

(() => {
  // console.log('\nPROCESS.ENV', process.env);
  console.log('\nPROCESS.ARGV', ...process.argv);

  const packageFilePath = './package.json',
    date = (new Date()).toJSON();

  let data = readFileSync(packageFilePath, 'utf8');
  execSync('echo "child_process.exec works"');
  data = JSON.parse(data);

  // Get git tag that was previously committed during the version process
  let argvOutput = process.argv.length > 2 && process.argv[2];
  console.log(`echo "process.argv Output ${argvOutput}"`);
  let output = argvOutput || execSync('git describe --tags --always --long', { encoding: 'utf8'});
  output = (output && output.trim()) || data.config.build;
  console.log('\nGIT BUILD NUMBER', output);

  if (data.config.build === output) {
    console.log('\nBUILD UPDATE NOT REQUIRED;', data.config.build);
    return;
  }

  // Assign full git tag to 'build' parameter
  data.config.build = output;
  // Assign new timestamp to 'timestamp' parameter
  data.config.timestamp = date;

  // save updated package.json file
  data = JSON.stringify(data, undefined, 2);
  if (typeof data === 'string' && data.length > 10) {
    writeFileSync(packageFilePath, `${data}\n`, {});
  }
})();
