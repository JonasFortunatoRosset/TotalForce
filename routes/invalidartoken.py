from controllers.invalidarToken import invalidarToken

def invalidartokens(app):
    app.route('/invalidartokens', methods=['POST'])(invalidarToken)