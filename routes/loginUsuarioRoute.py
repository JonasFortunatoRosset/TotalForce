from controllers.loginUsuarioController import loginUsuarioController

def loginusuario(app):
    app.route('/loginusuarios', methods=['POST'])(loginUsuarioController)