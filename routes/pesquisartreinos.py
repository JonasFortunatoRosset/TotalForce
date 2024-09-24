from controllers.pesquisarTreinoCotroller import pesquisarTreinoController

def pesquisartreinos(app):
    app.route('/pesquisartreinos', methods=['GET'])(pesquisarTreinoController)