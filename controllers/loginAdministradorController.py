from flask import request, jsonify
from models.administrador import Administrador

def loginAdministradorController():
    
    if request.method == 'POST':
        data = request.get_json()
        get_administrador_login = data['login']
        administrador = Administrador.query.get(get_administrador_login)
        if administrador is None:
            return {'Dados inexistentes'}
        if administrador.senha == data['senha']:
            return {'Senha correta'}
        else:
            return {'Senha incorreta'}