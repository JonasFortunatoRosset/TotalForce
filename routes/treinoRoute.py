from controllers.treinoCotroller import treinoController

def treinos(app):
    app.route('/treinos', methods=['POST','GET','PUT','DELETE'])(treinoController)