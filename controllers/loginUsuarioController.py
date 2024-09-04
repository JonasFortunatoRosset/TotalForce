from flask import request, jsonify
from models.loginUsuario import LoginUsuario

def loginUsuarioController():
    
    if request.method == 'POST':
        data = request.get_json() # Pega os dados do form front
        get_usuario_cpf = data['cpf'] # Pega o cpf do usuário
        usuario = LoginUsuario.query.get(get_usuario_cpf) # Pega cpf e senha usuario
        if usuario is None: # Verifica se retornou um resultado
            return {'Dados não existentes no banco'}
        if usuario.senha == data['senha']: # Verifica se a senha do cpf é igual a do form
            return {'Senha correta'}
        else: 
            return {'Senha incorreta'}