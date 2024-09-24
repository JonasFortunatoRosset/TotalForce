from controllers.loginUsuarioController import loginUsuarioController

def loginusuarios(app):
    app.route('/loginusuarios', methods=['POST'])(loginUsuarioController)