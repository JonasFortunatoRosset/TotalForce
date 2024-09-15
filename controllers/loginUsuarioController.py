from flask import request
from models.loginUsuario import LoginUsuario
import jwt
import bcrypt
import base64
import json
from main import app

def loginUsuarioController():
    

    def verify_password(dados, usuario_banco):
        return bcrypt.hashpw(dados['senha'].encode(), usuario_banco)


    def create_token(cpf, nome, secret_key):
        header = {"alg":"H256","type":"JWT"} # algoritimo e tipo de token 
        payload = {
            "sub": cpf,
            "nome": nome
        }
        
        header_encoded = base64.urisafe_b64encode(json.dumps(header).encode().rstrip(b'=')) # json => byte => base64
        payload_encoded = base64.urisafe_b64encode(json.dumps(payload).encode().rstrip(b'='))
        assinatura = jwt.encode(payload, secret_key, algorithm='HS256')

        return f"{header_encoded.decode()}.{payload_encoded.decode()}.{base64.urlsafe_b64encode(assinatura.encode()).rstrip(b'=').decode()}"
    

    def verify_token(token, secret_key):
        try:
            decoded = jwt.decode(token, secret_key, algorithms=['HS256'])
            return decoded
        except jwt.InvalidTokenError:
            return 'Token inválido'


    if request.method == 'POST': # ARRUMAR
        data = request.get_json() # Pega os dados do form front
        get_usuario_cpf = data['cpf'] # Pega o cpf do usuário do data/front
        usuario = LoginUsuario.query.get(get_usuario_cpf) # Pega cpf e senha usuario / se existir o cpf no banco
        
        if usuario is None: # Verifica se retornou um resultado
            return {'Dados não existentes no banco'}
        
        if verify_password(data, usuario): # Verifica se a senha do cpf é igual a do form
            token = create_token(get_usuario_cpf, usuario.nome, app.config['SECRET_KEY'])
            return token
        
        else: 
            return {'Senha incorreta'}