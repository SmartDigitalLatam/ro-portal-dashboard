// Importando mysql
let mysql = require('mysql');

// Funçao que realiza a conexao
let conexaoMysql = function () {
    console.log("Conexao iniciada com sucesso!")
    return conexao = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'thiago22',
        database: 'buckman'
    });
}

module.exports = function () {
    return conexaoMysql;
}

