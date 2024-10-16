from flask import request, jsonify
from models.administrador import Administrador
import jwt, bcrypt, base64, json, secrets, os


def loginAdministradorController():
    
    def verify_password(dados, administrador_banco):
        senha = dados['senha']
        senha_banco = administrador_banco.senha # Ver se ocorre corretamente a verificação
        return bcrypt.checkpw(senha.encode(), senha_banco.encode())


    def create_token(cpf, nome):
        header = {"alg":"H256","type":"JWT"} # algoritimo e tipo de token 
        payload = {
            "sub": cpf,
            "nome": nome,
            "exp": 60 # rever
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

    if request.method == 'POST':
        data = request.get_json()
        get_administrador_cpf = data['cpf']
        administrador = Administrador.query.get(get_administrador_cpf)
        if administrador is None:
            return {'Dados inexistentes'}
        if verify_password(data, administrador): # Verifica se a senha do cpf é igual a do form
            token = create_token(get_administrador_cpf, administrador.nome)
            return token
        else:
            return {'Senha incorreta'}