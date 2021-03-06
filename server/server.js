const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js');
const calculator = require('./modules/calc.js');
const app = express();
const PORT = process.env.PORT || 5566;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//express middleware
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

//app listener
http.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
})

//socket
io.on('connection', () => {
    console.log('a user is connected');
})

//get route for /calc
app.get('/calc', (req, res) => {
    //get only last 10 records, in descending order
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
    //send to calculator module for processing
    let calculation = calculator(req.body.expression);
    //if it returns a truthy result, save it in the database
    if (calculation) {
        let query = `INSERT INTO "calc_history" ("calculation") VALUES ($1)`;
        pool.query(query, [calculation]).then(result => {
            //tell client to update history via socket
            io.emit('getCalcHistory');
            res.send('calculation successful');
        }).catch(err => {
            console.log(err);
            res.send('calculation failed');
        })
    } else {
        res.send('calculation failed');
    }
}); //end of POST route