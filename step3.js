const fsP = require('fs').promises;
const axios = require('axios');

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    return contents
  } catch(err) {
    console.log(`Error fetching ${path}: ${err}`)
    process.exit(1);
  }
}

async function webCat(url) {
  let resp;
  try {
    resp = await axios({url});

  } catch(err) {
    console.log(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }

  return resp.data;
}

async function write(path, text) {
  try {
    await fsP.writeFile(path, text, 'utf8')
  } catch(err) {
    console.log(`Couldn't write ${path}: ${err}`);
    process.exit(1);
  }
}

async function catOrWebCat(path, outputTextOrNull) {
  let content
  if (path.startsWith('http')) {
    content = await webCat(path)
  } else {
    content = await cat(path)
  }

  if(outputTextOrNull) {
    await write(outputTextOrNull, content)
  }
  else {
    console.log(content)
  }
}

let path, outputTextOrNull;

if (process.argv[2] === "--out") {
  path = process.argv[4]
  outputTextOrNull = process.argv[3]
} 
else {
  path = process.argv[2]
}

catOrWebCat(path, outputTextOrNull)