from controllers.loginAdministradorController import loginAdministradorController

def loginadministradores(app):
    app.route('/loginadministradores', methods=['POST'])(loginAdministradorController)