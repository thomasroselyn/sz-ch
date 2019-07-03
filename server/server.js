const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js');
const calculator = require('./modules/calc.js');

const app = express();
const PORT = process.env.PORT || 5566;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
})

//get route for /calc
app.get('/calc', (req, res) => {
    let query = `SELECT * FROM "calc_history" ORDER BY "id" DESC LIMIT 10;`;
    pool.query(query).then(result => {
        console.log('calculator data retrieved');
        res.send(result.rows);
    }).catch(err => {
        console.log('cannot get calculator data:', err);
    })
}); //end of GET route

//post route for /calc
app.post('/calc', (req, res) => {
    console.log('post to calc req.body', req.body);
    let calculation = calculator(req.body);
    let query = `INSERT INTO "calc_history" ("calculation") VALUES ($1)`;
    pool.query(query, calculation).then(result => {
        console.log('calculation successful');
        res.sendStatus(201);
    }).catch(err => {
        console.log('calculation failed:', err);
        res.sendStatus(500);
    })
}); //end of POST route