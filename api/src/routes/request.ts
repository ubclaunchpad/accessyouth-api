import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();

import validator from 'validator';

const UserRequest = require('../models/request');

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isLatLong([req.body.location.lat, req.body.location.lon].join())) {
    res.status(400).send('location must have lat and lon');
    return;
  } else if (!validator.isMobilePhone(req.body.phone, validator.isMobilePhoneLocales)) {
    res.status(400).send('Invalid phone number');
    return;
  }

  UserRequest.create({
    location: req.body.location,
    phone: req.body.phone,
    details: req.body.details,
    status: 'valid'
  }, (err: any, userRequest: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(userRequest);
    }
  });
});

router.get('/getAllRequests', (req: Request, res: Response, next: NextFunction) => {
  UserRequest.find({ status: 'valid' }, (err: any, userRequest: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(userRequest);
    }
  });
});

module.exports = router;