import express from 'express';
const router = express.Router();

const Service = require('../models/service');

router.get('/create', (req, res) => {
  // TODO: validate req.body
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

module.exports = router;