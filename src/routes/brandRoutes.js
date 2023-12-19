const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Lista de marcas');
});

router.get('/:id', (req, res) => {
    return res.send('Lista uma marca');
});

router.post('/', (req, res) => {
    return res.send('Cria uma marca');
});

router.post('/:id', (req, res) => {
    return res.send('Edita uma marca');
});

router.delete('/:id', (req, res) => {
    return res.send('Deleta uma marca');
});

module.exports = router;