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
    console.log(sso_key);
  	request.get(`https://api.ote-godaddy.com/v1/domains/available?domain=${req.params.domain}&checkType=FULL&forTransfer=false/`)    
    	.set({Accept: 'application/json', Authorization: `sso-key 3mM44UYhVC4J3w_TkTtwSEqWbdt1koSVZPB7S:TkTvzYV3JoQ4U8YzdeBuf2`})
    	.then(data => {
    		res.json(JSON.parse(data.text));
    	})
    	.catch(err => {
    		res.status(500).json(JSON.parse(err.response.text));
    	})
});

app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});