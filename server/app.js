const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require('./database');
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;
// const symbol = 'TSLA';

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

db.connect();

app.get('/', (req,res) => {
    res.status(200).send("Hello from home page - server");
})

app.post('/getData', (req, res) => {
    const symbol = req.body.companyName ; 
    db.query(`select * from h_stock_prices where symbol = '${symbol}' order by date desc`,
    (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results.rows
            });
        }
    });
});

app.post('/getCompaniesCloseByDate', (request,response) => {
    const orderBy = request.body.order.toLowerCase() === 'asc' ? 'asc' : 'desc' ;
    const date = request.body.date;
    db.query(`select hsp.symbol, hsp.close from h_stock_prices as hsp where hsp.date = '${date}' order by hsp.close  ${orderBy} limit 10`)
        .then( res => {
            // console.log(date);
            response.send(res);
        }).catch( err => {
            response.send(err);
            // console.log(err);
        });
});

app.post('/companyDetails', (req, res) => {
    console.log(req);
    const symbol = req.body.companyName ; 
    db.query(`select * from listings where symbol = '${symbol}'`,
    (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results.rows
            });
        }
    });
});

app.post('/randomCompany', (req, res) => {
    const date = req.body.date;
    db.query(`select * from h_stock_prices limit 10`,
    (err, results) => {
        console.log('Results: ',results);
        console.log('Error', err);
        if(err) {
            return res.send(err)
        }
        else {
            console.log(res)
            return res.json({
                data: results.rows
            });
        }
    });
});

app.listen(port, err => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
  });