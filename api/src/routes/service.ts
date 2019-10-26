import express from 'express';
const router = express.Router();

const Service = require('../models/service');

router.post('/create', (req, res) => {
  // TODO: validate req
  Service.create({
    uuid: req.body.uuid,
    name: req.body.name,
    currentLocation: req.body.currentLocation,
    description: req.body.description,
  }, (err: any, doc: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(doc);
    }
  });
});

router.get('/getService', (req, res) => {
  // TODO: validate req
  Service.findOne({
    uuid: req.params.uuid
  }, (err: any, doc: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(doc);
    }
  });
});

router.post('/updateLocation', (req, res) => {
  // TODO: validate req
  Service.updateOne({
    uuid: req.body.uuid
  }, {
    currentLocation: req.body.currentLocation
  }, (err: any, res: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(res);
    }
  });
});

router.post('/updateDetails', (req, res) => {
  // TODO: validate req
  Service.updateOne({
    uuid: req.body.uuid
  }, {
    detail: req.body.description
  }, { runValidators: true},
  // Extension: two staff are going to update at the same time
  // {
  //   revision: req.body.revision    
  // }, 
  (err: any, res: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(res);
    }
  });
});

module.exports = router;