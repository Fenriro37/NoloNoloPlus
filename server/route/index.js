const express = require('express');
const router = express.Router();

const managerPath = __dirname + '/../frontEnd/manager';
const workerPath = __dirname + '/../frontEnd/worker';
const userPath = __dirname + '/../frontEnd/user';
const publicPath = __dirname + '/../frontEnd/public';

router.use('/worker/', express.static(workerPath + '/html/'));
router.use('/worker/css', express.static(workerPath + '/css/'));
router.use('/worker/js', express.static(workerPath + '/js/'));
router.use('/worker/media', express.static(workerPath + '/media/'));

router.use('/manager/', express.static(managerPath + '/'));
router.use('/manager/css', express.static(managerPath + '/css/'));
router.use('/manager/js', express.static(managerPath + '/js/'));
router.use('/manager/media', express.static(managerPath + '/media/'));

router.use('/css', express.static(managerPath + '/css/'));
router.use('/js', express.static(managerPath + '/js/'));

router.use('/user/', express.static(userPath + '/'));
router.use('/static/css', express.static(userPath + '/static/css'));
router.use('/static/js', express.static(userPath + '/static/js'));

router.use('/public/', express.static(publicPath + '/html/'));
router.use('/public/css', express.static(publicPath + '/css/'));
router.use('/public/js', express.static(publicPath + '/js/'));
router.use('/public/media', express.static(publicPath + '/media/'));

module.exports = router;