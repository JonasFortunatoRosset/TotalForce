from flask import request, jsonify
from models.loginColaborador import LoginColaborador

def loginColaboradorController():
    
    if request.method == 'POST':
        data = request.get_json()
        get_colaborador_login = data['login']
        colaborador = LoginColaborador.query.get(get_colaborador_login)
        if colaborador is None:
            return {'Dados inexistentes'}
        if colaborador.senha == data['senha']:
            return {'Senha correta'}
        else:
            return {'Senha incorreta'}