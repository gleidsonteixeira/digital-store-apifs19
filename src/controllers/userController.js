const DB = require('../database/index');
const table = 'users';

async function create(data){
    try {
        if(!data.user_name || data.user_name === ''){
            throw new Error('Nome do usuário é obrigatório!');
        }
        if(!data.user_email || data.user_email === ''){
            throw new Error('Email do usuário é obrigatório!');
        }
        if(!data.user_password || data.user_password === ''){
            throw new Error('Senha de usuário é obrigatório!');
        }

        const existeUsuario = await DB.execute(`SELECT * FROM users WHERE user_email = '${data.user_email}';`);

        if(existeUsuario.length > 0){
            throw new Error('Já existe um usuário com este email!');
        }

        await DB.execute(`INSERT INTO ${table} (user_name, user_email, user_password) VALUES ('${data.user_name}', '${data.user_email}', '${data.user_password}');`);
        return {
            message: 'Usuário criado com sucesso!'
        }
    } catch (error) {
        return {
            message: error.message
        }
    }
}

module.exports = {
    create
}