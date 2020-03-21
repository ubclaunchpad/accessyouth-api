import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();

import validator from 'validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { request } from 'http';

const LogsPersistence = require('../models/logs');

router.post('/persistLog', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isUUID(req.body.logid)) {
    res.status(400).send('id is not a valid uuid');
    return;
  } 
  
  LogsPersistence.create({
    logid: req.body.logid, 
    deviceType: req.body.deviceType, 
    deviceVersion: req.body.deviceVersion,
    appVersion: req.body.appVersion, 
    event: req.body.event,
    additionalInfo: req.body.additionalInfo
  }, (err: any, log: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(log);
    }
  });

});

router.get('/getAllLogs', (req: Request, res: Response, next: NextFunction) => {
    LogsPersistence.find({}, (err: any, logs: any) => {
        if (err) {
          res.status(500).send('Internal Error');
        } else {
          res.status(200).send(logs);
        }
      });
});

router.post('/getLog', (req: Request, res: Response, next: NextFunction) => {
    if (!validator.isUUID(req.body.logid)) {
        res.status(400).send('id is not a valid uuid');
        return;
    } 
    LogsPersistence.findOne({logid: req.body.logid}, (err: any, log: any) => {
        if (err) {
          res.status(500).send('Internal Error');
        } else {
          res.status(200).send(log);
        }
      });
  });


module.exports = router;