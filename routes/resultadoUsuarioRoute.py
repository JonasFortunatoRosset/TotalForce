from controllers.resultadoUsuarioController import resultadoUsuarioController

def resultadoUsuarios(app):
    app.route('/resultadousuarios', methods=['POST','GET','PUT','DELETE'])(resultadoUsuarioController)