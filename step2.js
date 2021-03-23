const fsP = require('fs').promises
const axios = require('axios')

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8")
    console.log('file contents', contents)
  } catch(err) {
    console.log(`Error fetching ${path}: ${err}`)
    process.exit(1)
  }
}

async function webCat(url) {
  let resp;
  try {
    resp = await axios{url})

  } catch(err) {
    console.log(`Error fetching ${url}: ${err}`)
    process.exit(1)
  }

  console.log(resp.data)
}

let path = process.argv[2]

if (path.startsWith('http')) {
  webCat(path)
}
else {
  cat(path)
}