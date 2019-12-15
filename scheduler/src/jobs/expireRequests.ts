const CronJob = require('cron').CronJob;

module.exports = new CronJob('0 * * * * *', () => {
  console.log('Running expireRequests job...');

  const UserRequest = require('../models/request');

  // requests expire in 2 hours
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - 2);

  UserRequest.updateMany({
    status: 'valid',
    createdAt: { $lt: cutoff }
  }, {
    $set: { status: 'expired' }
  }, (err: any, res: any) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Documents modified: ${res.nModified}`);
    }
  });
});