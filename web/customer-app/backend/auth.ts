import {Request, Response} from 'express';
import {partners, User, users} from './users';
import * as jwt from 'jsonwebtoken';
import {apiConfig} from './api.config';

export const handleAuthentication = (req: Request, res: Response) => {
  const user: User = req.body;
  if (isValid(user)) {
    const dbUser: User = users[user.email];
    const token = jwt.sign({
      sub: dbUser.id,
      iss: 'delivery-api',
      role: 'client'
    }, apiConfig.secret);
    return res.json({id: dbUser.id, name: dbUser.name, email: dbUser.email, access_token: token});
  } else {
    res.status(403).json({message: 'Invalid Data'});
  }
};

export const handlePartnerAuthentication = (req: Request, res: Response) => {
  const user: User = req.body;
  if (isValid(user)) {
    const dbUser: User = partners[user.email];
    const token = jwt.sign({
      sub: dbUser.id,
      iss: 'delivery-api',
      role: 'partner'
    }, apiConfig.secret);
    return res.json({id: dbUser.id, role: dbUser.role, access_token: token});
  } else {
    res.status(403).json({message: 'Invalid Data'});
  }
};

function isValid(user: User): boolean {
  if (!user) {
    return false;
  }
  const dbUser: User = users[user.email];
  return dbUser !== undefined && dbUser.matches(user);
}
