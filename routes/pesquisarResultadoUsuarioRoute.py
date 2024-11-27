from controllers.pesquisarResultadoUsuarioController import pesquisarResultadoUsuarioController

def pesquisarResultadoUsuario(app):
    app.route('/pesquisarresultadousuarios', methods=['POST'])(pesquisarResultadoUsuarioController)