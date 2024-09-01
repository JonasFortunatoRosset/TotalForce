from controllers.modalidadeController import modalidadeController

def modalidades(app):
    app.route('/modalidades', methods=['POST','GET','PUT','DELETE'])(modalidadeController)