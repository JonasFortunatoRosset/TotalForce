from flask import request, jsonify
from controllers.loginAdministrador import lo
from models.administrador import Administrador

def loginAdministradorController():
    
    if request.method == 'POST':
        data = request.get_json()
        login = Administrador.query.all()
        for i in login:
            if i.nome == data.nome and i.senha == data.senha:
                return True
            else:
                return False