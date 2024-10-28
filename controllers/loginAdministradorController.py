from flask import request, jsonify
from models.administrador import Administrador
from hashes.funcoes import verificar_senha, criar_token

def loginAdministradorController():

    if request.method == 'POST':
        data = request.get_json()
        get_administrador_login  = data['login']
        administrador = Administrador.query.filter_by(login=get_administrador_login) # Buscar administrador pelo codigo
        if administrador is None:
            return jsonify({'message': 'Administrador não encontrado'}), 404
        get_administrador_codigo = administrador[0].codigo
        login_administrador = administrador[0].login
        if get_administrador_login != login_administrador:
            return jsonify({'message': 'Login incorreto'})
        get_administrador_cpf = administrador[0].cpf
        # Verificar senha
        if verificar_senha(data, administrador):
            token = criar_token(get_administrador_cpf, administrador[0].nome)
            return jsonify({'token': token}), 200
        else:
            return jsonify({'message': 'Senha incorreta'}), 401