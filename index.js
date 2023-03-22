const express = require('express');

const path = require('path');

const app = express();
const port = 3000;

const htmlPath = path.join(__dirname, '/HTML/');
const publicPath = path.join(__dirname, '/public');
const cssPath = path.join(__dirname, '/CSS');
const jsPath = path.join(__dirname, '/js');


app.use(express.static(htmlPath));
app.use(express.static(publicPath));
app.use(express.static(cssPath));
app.use(express.static(jsPath));
console.log(jsPath);

// app.use(express.static(path.join(__dirname, '/public')));

// //app.use(express.static('js'));

// const htmlPath = path.join(__dirname, '/HTML');
// app.use(express.static(htmlPath));



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
