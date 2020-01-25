import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();

import validator from 'validator';
import jwt from 'jsonwebtoken';
const secret: any = process.env.JWT_SECRET;

const Account = require('../models/account');

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send('email is not valid');
    return;
  }
  // username/password validation?

  Account.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    accountType: req.body.accountType,
    status: 'valid'
  }, (err: any, account: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(account);
    }
  });
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send('email is not valid');
    return;
  }
  // username/password validation?
  
  Account.findOne({
    email: req.body.email,
    // username: req.body.username,
    password: req.body.password,
    status: 'valid'
  }, (err: any, account: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      jwt.sign({ payload: account }, secret, { expiresIn: 86400 }, (err, token) => {
        if (err) {
          res.status(500).send('Failed to create token');
        } else {
          res.status(200).send(token);
        }
      })
    }
  });
});

module.exports = router;