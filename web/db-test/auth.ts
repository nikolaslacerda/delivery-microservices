import {Request, Response} from 'express';
import {Partner, partners} from './partner';
import * as jwt from 'jsonwebtoken';
import {apiConfig} from './api.config';

import multer = require('multer');

const maxSize = 2 * 1024 * 1024;

export const handlePartnerAuthentication = (req: Request, res: Response) => {
  const partner = req.body;
  if (isValid(partner)) {
    const dbUser: Partner = partners[partner.email];
    const token = jwt.sign({
      sub: dbUser.id,
      iss: 'delivery-api',
    }, apiConfig.secret);
    return res.json({id: dbUser.id, access_token: token});
  } else {
    res.status(403).json({message: 'Invalid Data'});
  }
};

export const handleRestaurantProfileUpdateImage = async (req: Request, res: Response, next) => {
  await uploadFile(req, res, next);
};

function generateImageName(id: any, name: any): string {
  const a = Math.floor(Math.random() * (99999999 - 11111111)) + 11111111;
  return id + '_image_' + a + '.' + name.substr(name.lastIndexOf('.') + 1);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../db-images/restaurants');
  },
  filename: (req, file, callback) => {
    callback(null, generateImageName(req.params.restaurantId, file.originalname));
  },
});

const uploadFile = multer({
  storage,
  limits: {fileSize: maxSize},
  fileFilter(req: Request, file: any, cb: any): any {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload JPG and PNG images only!'));
    }
    cb(undefined, true);
  }
}).single('file');

function isValid(partner: Partner): boolean {
  if (!partner) {
    return false;
  }
  const dbUser: Partner = partners[partner.email];
  console.log(dbUser);
  console.log(dbUser.matches(partner));
  return dbUser !== undefined && dbUser.matches(partner);
}
