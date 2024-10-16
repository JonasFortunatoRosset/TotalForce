from flask import request, jsonify
from models.usuario import Usuario
import jwt, bcrypt, base64, json, secrets, os


def loginUsuarioController():
    

    def verify_password(dados, usuario_banco):
        senha = dados['senha']
        senha_banco = usuario_banco.senha
        return bcrypt.checkpw(senha.encode(), senha_banco.encode())


    def create_token(cpf, nome):
        header = {"alg":"H256","type":"JWT"} # algoritimo e tipo de token 
        payload = {
            "sub": cpf,
            "nome": nome
        }
        secret_key = os.getenv("secret_key", secrets.token_hex(32))

        header_encoded = base64.urlsafe_b64encode(json.dumps(header).encode().rstrip(b'=')) # json => byte => base64
        payload_encoded = base64.urlsafe_b64encode(json.dumps(payload).encode().rstrip(b'='))
        assinatura = jwt.encode(payload, secret_key, algorithm='HS256')

        token = f"{header_encoded.decode()}.{payload_encoded.decode()}.{base64.urlsafe_b64encode(assinatura.encode()).rstrip(b'=').decode()}"
        print(f"meu token: {token}")
        return token
        
    

    def verify_token(token, secret_key):
        try:
            decoded = jwt.decode(token, secret_key, algorithms=['HS256'])
            return decoded
        except jwt.InvalidTokenError:
            return 'Token inválido'


    if request.method == 'POST': # ARRUMAR
        data = request.get_json() # Pega os dados do form front
        print(data)
        get_usuario_cpf = data['cpf'] # Pega o cpf do usuário do data/front
        usuario = Usuario.query.get(get_usuario_cpf) # Pega todos os dados do banco do usuario
        usuario_status = usuario[0].status
        if status_usuario != 'ativo':
            return jsonify({'message': 'Status inválido para login'})
        if usuario is None: # Verifica se retornou um resultado
            return {'Dados não existentes no banco'}
        
        if verify_password(data, usuario): # Verifica se a senha do cpf é igual a do form
            token = create_token(get_usuario_cpf, usuario.nome)
            return token
        
        else: 
            return {'Senha incorreta'}