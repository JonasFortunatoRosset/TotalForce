from flask import request, jsonify
from models.usuario import Usuario
from hashes.funcoes import verificar_senha, criar_token_usuario


def loginUsuarioController():

    if request.method == 'POST':
        data = request.get_json()
        get_usuario_login  = data['login']
        usuario = Usuario.query.filter_by(login=get_usuario_login) # Buscar usuario pelo login
        if usuario[0] is None:
            return jsonify({'message': 'Usuário não encontrado'}), 404
        get_usuario_codigo = usuario[0].codigo
        login_usuario = usuario[0].login 
        # Verificar senha
        if verificar_senha(data, usuario):
            token = criar_token_usuario(get_usuario_login, usuario[0].nome)
            response = {
                'codusuario': get_usuario_codigo,
                'token': token
            }
            return jsonify(response), 200
        else:
            return jsonify({'message': 'Senha incorreta'}), 401