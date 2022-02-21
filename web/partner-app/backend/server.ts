import * as jsonServer from 'json-server';
import {Express} from 'express';

import * as fs from 'fs';
import * as https from 'https';

import {handlePartnerAuthentication, handleRestaurantProfileUpdateImage} from './auth';
import {handleMenuItemUpdateImage} from './menuItemImage';

const server: Express = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.post('/partner/login', handlePartnerAuthentication);

// server.post('/orders', handleAuthorization);

server.post('/restaurants/:restaurantId/update-image', handleRestaurantProfileUpdateImage, (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    return next(error);
  }
  res.status(200).send({
    statusCode: 200,
    status: 'success',
    uploadedFile: file
  });
}, (error, req, res, next) => {
  res.status(400).send({
    error: error.message
  });
});

server.post('/menuItems/:menuItemId/update-image', handleMenuItemUpdateImage, (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    return next(error);
  }
  res.status(200).send({
    statusCode: 200,
    status: 'success',
    uploadedFile: file
  });
}, (error, req, res, next) => {
  res.status(400).send({
    error: error.message
  });
});

server.use(router);

const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
};

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running');
});
