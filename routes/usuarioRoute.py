from controllers.usuarioController import usuariosController

def usuarios(app):
    app.route('/usuarios', methods=['POST','GET','PUT','DELETE'])(usuariosController)