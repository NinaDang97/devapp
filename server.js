const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
//DB config
const db = require('./config/keys.js').mongoURI;

//bodyParser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect mlab
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Errors in connect mongo, ', err));

//Passport Middleware Initialize
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

// User Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
