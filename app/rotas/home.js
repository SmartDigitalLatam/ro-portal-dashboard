module.exports=function rotas(app)
{
    app.get('/teste',(req, res)=>
    {
        app.app.controllers.dados.listarDados(app, req, res);
    });
    app.get('/', (req, res) =>
    {
        res.send("Servidor node rodando nos trinques");
    });
    app.get('/api',(req, res)=>
    {
        app.app.controllers.dados.listarDados(app, req, res);
    });
}