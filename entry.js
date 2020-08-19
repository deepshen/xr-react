const path = require("path");
const fs = require("fs");

function getEntries() {
  function isDir(dir) {
    return fs.lstatSync(dir).isDirectory();
  }

  const entries = {
    index: path.join(__dirname, `./src/components/index.tsx`),
  };
  const dir = path.join(__dirname, "./src/components/lib");
  const files = fs.readdirSync(dir);
  (function checkFile(files){
    files.forEach((file) => {
      const absolutePath = path.join(dir, file);
      if (isDir(absolutePath)) {
        checkFile(absolutePath)
        // entries[file] = path.join(
        // __dirname,
        // `../src/components/${file}/index.tsx`
        // );
      }else {
        entries[file.split('.')[0]] = path.resolve(__dirname, absolutePath)
      }
    });
  })(files)

  return entries;
}

const entryies = getEntries();
console.log(entryies)

module.exports = entryies;
