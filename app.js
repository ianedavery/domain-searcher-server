const express = require('express');
const logger = require('morgan');
const request = require('superagent');
require('dotenv').config();

let sso_key = process.env.SSO_KEY;

const app = express();

app.use(logger('dev'));

app.get('/:domain', (req, res) => {
  	request.get(`https://api.ote-godaddy.com/v1/domains/available?domain=${req.params.domain}&checkType=FULL&forTransfer=false/`)    
    	.set({Accept: 'application/json', Authorization: `sso-key ${sso_key}`})
    	.then((data) => {
    		res.json(JSON.parse(data.text));
    	})
    	.catch(err => {
    		res.status(500).json({message: 'Internal Server Error'});
    	})
})

app.listen(8080);