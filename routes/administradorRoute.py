from controllers.administradorController import administradorController

def administradores(app):
    app.route('/administradores', methods=['POST','GET','PUT','DELETE'])(administradorController)