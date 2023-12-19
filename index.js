const express = require('express');
const cors = require('cors');

const brandRoutes = require('./src/routes/brandRoutes');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    return res.send('Mudei aqui denovo!');
});

app.get('/docs', (req, res) => {
    return res.send('Documentação da aplicação');
});

app.use('/brands', brandRoutes);

app.all('*', (req, res) => {
    return res.send(JSON.stringify({
        type: 'error',
        message: 'Este endpoint não existe'
    }));
});

app.listen(port, () => {
    console.log(`Servidor de pé no link: http://localhost:${port}`);
});