from controllers.colaboradorCotroller import colaboradorController

def colaboradores(app):
    app.route('/colaboradores', methods=['POST','GET','PUT','DELETE'])(colaboradorController)