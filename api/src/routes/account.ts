import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();

import validator from 'validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const secret: any = process.env.JWT_SECRET;

const Account = require('../models/account');

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  // if (!validator.isEmail(req.body.email)) {
  //   res.status(400).send('email is not valid');
  //   return;
  // }
  if (!validator.isAlphanumeric(req.body.username)) {
    res.status(400).send('username is not valid');
    return;
  } else if (!validator.isLength(req.body.password, { min: 8 })) {
    res.status(400).send('password is not valid');
    return;
  }

  // callback cheese, revamp to promises
  Account.findOne({
    username: req.body.username,
    status: 'valid'
  }, (err: any, account: any) => {
    if (err) {
      res.status(500).send('Internal Error');
      return;
    } else {
      if (account) {
        res.status(400).send('Username already taken');
        return;
      } else {
        Account.create({
          // email: req.body.email,
          username: req.body.username,
          password: crypto.createHash('md5').update(req.body.password).digest('hex'),
          accountType: req.body.accountType,
          status: 'valid'
        }, (err: any, account: any) => {
          if (err) {
            res.status(500).send('Internal Error');
          } else {
            res.status(200).send(account);
          }
        });
      }
    }
  });
});

router.get('/details', (req: Request, res: Response, next: NextFunction) => {
  // goes through the verify middleware so if it reaches here token is valid
  res.status(200).send(res.locals.payload);
  return;
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  // if (!validator.isEmail(req.body.email)) {
  //   res.status(400).send('email is not valid');
  //   return;
  // }
  if (!validator.isAlphanumeric(req.body.username)) {
    res.status(400).send('username is not valid');
    return;
  } else if (!validator.isLength(req.body.password, { min: 8 })) {
    res.status(400).send('password is not valid');
    return;
  }
  
  Account.findOne({
    // email: req.body.email,
    username: req.body.username,
    password: crypto.createHash('md5').update(req.body.password).digest('hex'),
    status: 'valid'
  }, (err: any, account: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else if (!account) {
      res.status(400).send('Account not found');
    } else {
      jwt.sign({ payload: account }, secret, { expiresIn: 86400 }, (err, token) => {
        if (err) {
          res.status(500).send('Failed to create token');
        } else {
          res.status(200).send(token);
        }
      });
    }
  });
});

module.exports = router;