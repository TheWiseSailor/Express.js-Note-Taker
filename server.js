//putting the required modules
const express = require('express');
const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

//creating an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

//creating the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//creating the routes to the api and html
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
//initiation of the server
app.listen(PORT, startServerMessage);function startServerMessage() {
  const message = `Server is listening on port ${PORT}`;
  console.log(message);
}