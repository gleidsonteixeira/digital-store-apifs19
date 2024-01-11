const DB = require('../database/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        bcrypt.hash(data.user_password, 10, async (error, hash) => {
            if(error){
                throw new Error('Problema ao criptografar a senha');
            }

            await DB.execute(`INSERT INTO ${table} (user_name, user_email, user_password) VALUES ('${data.user_name}', '${data.user_email}', '${hash}');`);
            
        });
        
        return {
            type: 'success',
            message: 'Usuário criado com sucesso!'
        }

    } catch (error) {
        return {
            typr: 'error',
            message: error.message
        }
    }
}

async function login(data){
    try {
        if(!data.user_email || data.user_email === ''){
            throw new Error('Email obrigatório');
        }

        if(!data.user_password || data.user_password === ''){
            throw new Error('Senha obrigatória');
        }

        const result = await DB.execute(`SELECT * FROM ${table} WHERE user_email = '${data.user_email}';`);

        if(result.length === 0){
            return {
                message: 'Email ou senha incorretos'
            }
        }

        let token;

        bcrypt.compare(data.user_password, result[0].user_password, async (error, result) => {
            if(error){
                return {
                    message: 'Email ou senha incorretos'
                }
            }

            if(result){
                token = jwt.sign({ user_id: result[0].user_id }, 'digital-store-api', {
                    expiresIn: '1h'
                });
        
                await DB.execute(`UPDATE ${table} SET token = '${token}' WHERE user_id = ${result[0].user_id};`);
            }
        });

        if(!token){
            return {
                message: 'Email ou senha incorretos'
            }
        }

        return {
            token
        }

    } catch (error) {
        return {
            message: error.message
        }
    }
}

module.exports = {
    create,
    login
}