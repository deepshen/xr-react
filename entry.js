const path = require('path');
const fs = require('fs');

function getEntries() {
  function isDir(dir) {
    return fs.lstatSync(dir).isDirectory();
  }

  const entries = {
    index: path.join(__dirname, './src/components/index.tsx'),
  };
  const dir = path.join(__dirname, './src/components/lib');
  const mainFiles = fs.readdirSync(dir);
  (function checkFile(files) {
    files.forEach((file) => {
      const absolutePath = path.join(dir, file);
      if (isDir(absolutePath)) {
        checkFile(absolutePath);
      } else {
        entries[file.split('.')[0]] = path.resolve(__dirname, absolutePath);
      }
    });
  }(mainFiles));

  return entries;
}

const entryies = getEntries();

module.exports = entryies;
