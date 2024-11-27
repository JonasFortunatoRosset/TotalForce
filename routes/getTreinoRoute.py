from controllers.getTreinosController import getTreinoController

def getTreinos(app):
    app.route('/gettreinos', methods=['GET'])(getTreinoController)