const http = require('http');
const url = require('url');
const fs = require('fs');
const {
  readFile,
  appendFile,
  writeFile,
  rename,
  unlink,
} = require('fs/promises');

const port = 3000;

/////EPAM operation INPUT OUTPUT
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter your name: ', name => {
  rl.question('Enter your age: ', age => {
    age = Number(age);

    console.log(`Your name is ${name}. You are ${age} years old.`);

    rl.close();
  });
});

///////Manipulation with file system
/////fs/promises
const deleteAsync = async file => {
  try {
    await unlink(file);
    console.log(` file ${file} deleted`);
  } catch (error) {
    console.log('!!something wrong!!', error.message);
  }
};
// deleteAsync('oldFile.txt');

const renameAsync = async (from, to) => {
  try {
    await rename(from, to);
    console.log(` file ${from} renamed to ${to}`);
  } catch (error) {
    console.log('!!something wrong!!', error.message);
  }
};
// renameAsync('newFile.txt', 'oldFile.txt');

const writeAsyncFile = async (file, data) => {
  try {
    await writeFile(file, data);
    console.log(`content added to file ${file}`);
  } catch (error) {
    console.log('!!something wrong!!', error.message);
  }
};

// writeAsyncFile('hello.txt', 'I love node.js\n');

const appendAsyncFile = async (file, data) => {
  try {
    await appendFile(file, data, {flag: 'w'}); // flag 'a'- append (by default), 'w' - rewrite
    console.log(`content added to file ${file}`);
  } catch (error) {
    console.log('!!something wrong!!', error.message);
  }
};

const readAsyncFile = async file => {
  try {
    const data = await readFile(file);
    console.log(data.toString());
  } catch (error) {
    console.log('!!something wrong!!', error.message);
  }
};
// readAsyncFile('hello.txt');

/////fs
const fileName = 'newFile.txt';
const content = 'some content';

// fs.open(fileName, 'a+', (err, f) => {
//   try {
//     if (err) throw err;
//     console.log(f);
//     console.log(`file opened`);
//     fs.write(f, content, err => {
//       if (err) throw err;
//       console.log(`content appended to file`);
//       fs.close(f, err => {
//         if (err) throw err;
//         console.log(`file closed`);
//       });
//     });
//   } catch (error) {
//     console.log('catch err', error);
//   }
// });

// fs.readFile('hello.txt', (err, date) => {
//   console.log(date.toString());
// });

/////w3schools

///// http
//   .createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World!');
//   })
//   .listen(port);

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = '.' + q.pathname;
    console.log(filename);
    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end('404 Not Found');
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end(`create page ${filename}`);
    });
  })
  .listen(port, () => {
    console.log(`Enter your name: server listening on port 3000`);
    console.log(`Start your internet browser, and type in the address: http://localhost:3000/summer.html
  or http://localhost:3000/winter.html`);
  });

///////url
// const adr = 'http://localhost:8080/default.htm?year=2017&month=february';
// const q = url.parse(adr, true);

// console.log(q.host); //returns 'localhost:8080'
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search); //returns '?year=2017&month=february'
// const qdata = q.query; //returns an object: { year: 2017, month: 'february' }
// console.log(qdata.month); //returns 'february'
