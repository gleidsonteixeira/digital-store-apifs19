const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/', async (req, res) => {
    return res.send(await controller.create(req.body));
});

module.exports = router;