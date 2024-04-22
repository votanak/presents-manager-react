import verify from 'jsonwebtoken';
import { fileToArray } from '../services/arrayFile.js';
export const accessTokenSecret = 'youraccesstokensecret';
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.startsWith('Bearer')
      ? authHeader.split(' ')[1]
      : authHeader;

    verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const adminAuth = fileToArray('adminAuth.json');
      req.user = adminAuth.email === user.email ? adminAuth : null;
      req.user = fileToArray('adminAuth.json').user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
