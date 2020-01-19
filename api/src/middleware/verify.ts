import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();

import jwt from 'jsonwebtoken';
const secret: any = process.env.JWT_SECRET;

const routes = ['/create', '/updateLocation', '/updateDetails'];

router.use(routes, (req: Request, res: Response, next: NextFunction) => {
  // authentication header leads with 'Bearer '
  const authString = (typeof req.headers.authorization === 'string') ? req.headers.authorization.split(' ')[1] : '';
  jwt.verify(authString, secret, (err: any, decoded: any) => {
    if (err) {
      res.status(400).send('Invalid token');
    } else {
      next();
    }
  });
});

module.exports = router;