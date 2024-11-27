from controllers.pesquisarCodplanoUsuarioController import pesquisarCodplanoUsuarioController

def pesquisarCodplanoUsuarios(app):
    app.route('/pesquisarcodplanousuarios', methods=['GET'])(pesquisarCodplanoUsuarioController)