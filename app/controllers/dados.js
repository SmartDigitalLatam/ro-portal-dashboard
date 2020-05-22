module.exports.listarDados = function(app, req, res){
    let connection = app.config.dbConnection();
		let dadosModel = new app.app.models.dadosDAO(connection);
        dadosModel.getDados(function (error, result) {
			if(error) {
				console.log("Error")
				console.log(error)
			}
			else{
				res.send(result);
			}
			//res.render('disciplinas', { erros: {}, dado: {}, dados: result });
		}); 
}