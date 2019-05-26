const express = require('express');
const bodyParser = require('body-parser');
const phrases = require('./phrases');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 9000;

const addPlayer = (list, newPlayer) => {
  if (list.includes(newPlayer)) {
    return list;
  }
  return [...list, newPlayer];
};

const removePlayer = (list, removePlayer) => {
  return list.filter((player) => (player !== removePlayer ));
};

const matchStatus = (list) => {
  return list;
}

const clearMatch = () => {
  return [];
};

const getList = (players) => players.map((name, index) => (
  `${index + 1} - ${name} \n`
)).join('');

const getPhrase = () => {
  return phrases[Math.round(Math.random() * phrases.length)];
}

const getMatchDate = () => {
  const dayINeed = 4; // for Thursday
  const today = moment().isoWeekday();

  // if we haven't yet passed the day of the week that I need:
  if (today <= dayINeed) {
    // then just give me this week's instance of that day
    return moment().isoWeekday(dayINeed);
  } else {
    // otherwise, give me *next week's* instance of that same day
    return moment().add(1, 'weeks').isoWeekday(dayINeed);
  }
};

const messagesForActions = {
  juego: (user_name) => `Así me gusta, ${user_name} estas jugando.`,
  nojuego: (user_name) => `Yo sabía que no tenias huevos. Te bajaste ${user_name}.`,
  status: () => `El estado es el siguiente.`,
  clear: () => `Limpiando la lista.`
}

const actions = {
  juego: addPlayer,
  nojuego: removePlayer,
  status: matchStatus,
  clear: clearMatch
};

app.use(bodyParser.urlencoded({ extended: false }))


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Hola soy el Diego!'));

app.use((req, res, next) => {
  // get the actual status
  req.locals = {
    list: [
      'Juan',
      'Pedro'
    ]
  };
  next();
});

app.post('/', (req, res) => {
  let msg = [];

  const actionToExecute = actions[req.body.command.replace(/\//, '')];

  if (!actionToExecute) {
    res.status(403).send('Bad request');
    return;
  }

  msg.push(messagesForActions[req.body.command.replace(/\//, '')](req.body.user_name));

  const newList = actionToExecute(req.locals.list, req.body.user_name);

  msg.push('');

  msg.push(`El partido se viene: (${getMatchDate().format('l')})`);
  msg.push(getList(newList));

  msg.push(getPhrase());

  res.send(msg.join('\n'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));