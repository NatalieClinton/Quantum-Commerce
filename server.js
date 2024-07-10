const express = require('express');
const routes = require('./routes');
// IMPORT SEQUELIZE CONNECTION
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// SYNC SEQUELIZE MODELS TO THE DATABASE, THEN TURN ON THE SERVER
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
