const express = require('express');
const router = express.Router();
const path = require('path')

const managerPath = __dirname + '/../../frontEnd/manager';
const workerPath = __dirname + '/../../frontEnd/worker';
const userPath = __dirname + '/../../frontEnd/user';
const publicPath = __dirname + '/../../frontEnd/public';

router.use('/worker/', express.static(workerPath + '/html/'));
router.use('/worker/css', express.static(workerPath + '/css/'));
router.use('/worker/js', express.static(workerPath + '/js/'));
router.use('/worker/media', express.static(workerPath + '/media/'));

router.use('/manager/', express.static(managerPath + '/'));
router.get('/manager/index', (req, res) => {
    res.sendFile(path.join(mangerPath + '/index.html'));
});

router.use('/user/page/static/css', express.static(userPath + '/static/css'));
router.use('/user/page/static/js', express.static(userPath + '/static/js'));
router.use('/user/', express.static(userPath + '/'));

router.get('/user/page', (req, res) => {
    res.sendFile(path.join(userPath + '/index.html'));
});
router.get('/user/reservation', (req, res) => {
    res.sendFile(path.join(userPath + '/index.html'));
});
router.get('/user/invoice', (req, res) => {
    res.sendFile(path.join(userPath + '/index.html'));
});

router.use('/public/', express.static(publicPath + '/html/'));
router.use('/public/css', express.static(publicPath + '/css/'));
router.use('/public/js', express.static(publicPath + '/js/'));
router.use('/public/media', express.static(publicPath + '/media/'));

module.exports = router;