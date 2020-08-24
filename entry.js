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
  (function checkFile(files=[],prePath) {
    files.forEach((file) => {
      const absolutePath = path.join(prePath, file);
      if (isDir(absolutePath)) {
        const itemFiles = fs.readdirSync(absolutePath)
        checkFile(itemFiles,absolutePath);
      } else {
        if(/\.(ts|tsx|js|jsx)$/.test(file)){
          entries[file.split('.')[0]] = path.resolve(__dirname, absolutePath);
        }
      }
    });
  }(mainFiles,dir));

  return entries;
}

const entryies = getEntries();

module.exports = entryies;
