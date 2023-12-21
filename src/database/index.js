const mysql = require('mysql2/promise');

async function execute(sql){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'digital_store',
        port: 3307
    });

    const [result] = await connection.query(sql);

    return result;
}

module.exports = {
    execute
}