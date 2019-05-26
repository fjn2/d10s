const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Chau World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));