from controllers.validarToken import validarToken

def validartokens(app):
    app.route('/validartokens', methods=['POST'])(validarToken)