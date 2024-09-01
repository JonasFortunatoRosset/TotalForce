from controllers.treinoCotroller import treinoController

def treinos(app):
    app.route('/usuarios', methods=['POST','GET','PUT','DELETE'])(treinoController)