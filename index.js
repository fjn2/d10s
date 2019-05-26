const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
  console.log(req.body);
  // &user_id=U2147483697

  if (req.body.command === '/juego') {
    res.send(`Así me gusta, ${req.body.user_name} estas jugando`);
  }
  if (req.body.command === '/nojuego') {
    res.send(`Yo sabía que no tenias huevos. ${req.body.user_name} te bajaste`);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));