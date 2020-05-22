function DadosDAO(connection) {
	this._conn = connection;
}
DadosDAO.prototype.getDados = function (callback) {
	let sql = 'select * from dados';
	this._conn.query(sql, callback);
}
module.exports = ()=>{ 
	return DadosDAO;
}