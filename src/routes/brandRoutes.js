const express = require('express');
const controller = require('../controllers/brandController');
const router = express.Router();

router.get('/', async (req, res) => {
    return res.send(await controller.listarTodos());
});

router.get('/:id', (req, res) => {
    return res.send(`Lista uma marca: ${req.params.id}`);
});

router.post('/', (req, res) => {
    return res.send(`Cria uma marca: ${JSON.stringify(req.body)}`);
});

router.post('/:id', (req, res) => {
    return res.send('Edita uma marca');
});

router.delete('/:id', (req, res) => {
    return res.send('Deleta uma marca');
});

module.exports = router;