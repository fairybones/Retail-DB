// import sequelize connection
const express = require('express');
// import all routes
const routes = require('./routes');

// initialize express.js server
const app = express();
// establish listening port
const PORT = process.env.PORT || 3001;

// middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});