const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/db');
const passport = require('passport');

//Restrict repeating indexes
mongoose.set('useCreateIndex', true);

//Connect database
mongoose.connect(
  config.db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

//Display database connection confirmation
mongoose.connection.on('connected', () => {
  console.log('Connected to database: '+config.db);
});

//Display possile connection error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

//Port number
const port = process.env.PORT || 8080;

//CORS
app.use(cors());

//Angular
app.use(express.static(path.join(__dirname, 'public')));

//Body parser
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Routing
app.get('/', (req, res) =>{
  res.send('Invalid request');
});

app.get('*',(req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
