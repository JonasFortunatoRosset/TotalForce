from flask import request, jsonify
from models.colaborador import Colaborador
from hashes.funcoes import verificar_senha, criar_token

def loginColaboradorController():

    if request.method == 'POST':
        data = request.get_json()
        get_colaborador_login  = data['login']
        colaborador = Colaborador.query.filter_by(login=get_colaborador_login) # Buscar colaborador pelo login
        if colaborador[0] is None:
            return jsonify({'message': 'Colaborador não encontrado'}), 404
        get_colaborador_codigo = colaborador[0].codigo
        login_colaborador = colaborador[0].login 
        get_colaborador_cpf = colaborador[0].cpf
        # Verificar senha
        if verificar_senha(data, colaborador):
            token = criar_token(get_colaborador_cpf, colaborador[0].nome)
            return jsonify({'token': token}), 200
        else:
            return jsonify({'message': 'Senha incorreta'}), 401