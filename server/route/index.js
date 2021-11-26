const express = require('express');
const router = express.Router();

const managerPath = __dirname + '/../client/manager';
const workerPath = __dirname + '/../client/worker';
const userPath = __dirname + '/../client/user';
const publicPath = __dirname + '/../client/public';

router.use('/manager/', express.static(managerPath + '/html/'));
router.use('/manager/css', express.static(managerPath + '/css/'));
router.use('/manager/js', express.static(managerPath + '/js/'));
router.use('/manager/media', express.static(managerPath + '/media/'));

router.use('/worker/', express.static(workerPath + '/'));
router.use('/worker/css', express.static(workerPath + '/css/'));
router.use('/worker/js', express.static(workerPath + '/js/'));
router.use('/worker/media', express.static(workerPath + '/media/'));

router.use('/css', express.static(workerPath + '/css/'));
router.use('/js', express.static(workerPath + '/js/'));

router.use('/user/', express.static(userPath + '/html/'));
router.use('/user/css', express.static(userPath + '/css/'));
router.use('/user/js', express.static(userPath + '/js/'));
router.use('/user/media', express.static(userPath + '/media/'));

router.use('/public/', express.static(publicPath + '/html/'));
router.use('/public/css', express.static(publicPath + '/css/'));
router.use('/public/js', express.static(publicPath + '/js/'));
router.use('/public/media', express.static(publicPath + '/media/'));

module.exports = router;