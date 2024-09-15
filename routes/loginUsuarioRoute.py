from controllers.loginUsuarioController import loginUsuarioController

def loginUsuario(app):
    app.route('loginusuario', methods=['POST'])(loginUsuarioController)