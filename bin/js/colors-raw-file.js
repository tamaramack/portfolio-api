const fs = require('fs');
const path = require('path');
const util = require('util');

(async () => {
  const readFile = util.promisify(fs.readFile);

  const dataDir = path.resolve(__dirname, 'colors');
  const destinationDir = path.resolve(__dirname, '../css');
  const encoding = 'utf-8';

  await saveJsonFile();

  async function saveJsonFile() {
    const workFile = 'colors.json';
    const rawInput = await readFile(path.join(dataDir, workFile));
    const json = JSON.parse(rawInput);
    let content = '';

    for (const prop in json) {
      if (json.hasOwnProperty(prop) && prop
        !== 'transparent') { content += `$${prop}: ${json[prop]};\n`; }
    }

    fs.writeFileSync(path.join(destinationDir, 'colors.scss'), content);
  }
})();
