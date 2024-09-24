from controllers.loginColaboradorController import loginColaboradorController

def logincolaboradores(app):
    app.route('/logincolaboradores', methods=['POST'])(loginColaboradorController)