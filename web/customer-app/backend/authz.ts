import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {apiConfig} from './api.config';

function extractToken(req: Request): string {
  if (req.headers && req.get('Authorization')) {
    const parts: string[] = req.get('Authorization').split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
  }
  return undefined;
}

export const handleAuthorization = (req: Request, res: Response, next) => {
  const token = extractToken(req);
  if (!token) {
    res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
    res.status(401).json({message: 'Not Authenticate'});
  } else {
    jwt.verify(token, apiConfig.secret, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        res.status(403).json({message: 'Not Authorized'});
      }
    });
  }
};
