const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

app.get('/', (req, res) => {

  const name = 'Full Cycle Rocks';
  const sqlCreateTable = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);`;
  const sqlInsert = `INSERT INTO people (name) VALUES ('${name}');`;

  connection.query(sqlCreateTable, (err) => {
    if (err) throw err;
    console.log(`Table created`);
  });

  connection.query(sqlInsert, (err) => {
    if (err) throw err;
    console.log(`Name ${name} inserted in the database`);
  });

  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>
      <li>${name}</li>
    </ul>
  `);
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
