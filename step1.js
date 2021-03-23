
const fsP = require('fs').promises

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8")
    console.log('file contents', contents)
  } catch(err) {
    console.log(`Error fetching ${path}: ${err}`)
    process.exit(1)
  }
}

cat(process.argv[2])