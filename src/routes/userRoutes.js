const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');


router.get('/', async (req, res) => {
    return res.send(await controller.listAll());
});

router.post('/', async (req, res) => {
    return res.send(await controller.create(req.body));
});

router.post('/login', async (req, res) => {
    return res.send(await controller.login(req.body));
});

module.exports = router;