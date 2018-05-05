const express = require('express');
const logger = require('morgan');
const request = require('superagent');
require('dotenv').config();

let sso_key = process.env.SSO_KEY;

const app = express();

app.use(logger('dev'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.get('/:domain', (req, res) => {
  	request.get(`https://api.ote-godaddy.com/v1/domains/available?domain=${req.params.domain}&checkType=FULL&forTransfer=false/`)    
    	.set({Accept: 'application/json', Authorization: `sso-key ${sso_key}`})
    	.then(data => {
    		res.json(JSON.parse(data.text));
    	})
    	.catch(err => {
    		res.status(500).json(JSON.parse(err.response.text));
    	})
})

app.listen(8080);