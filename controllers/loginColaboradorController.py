from flask import request, jsonify
from models.colaborador import Colaborador
import bcrypt, secrets, os, jwt, base64, json

def loginColaboradorController():


    def verify_password(dados, colaborador_banco):
        senha = dados['senha']
        senha_banco = colaborador_banco.senha
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


    if request.method == 'POST':
        data = request.get_json()
        get_colaborador_cpf = data['cpf']
        colaborador = Colaborador.query.get(get_colaborador_cpf)
        status_colaborador = colaborador[0].status # Pega o status do colaborador
        if colaborador is None or status_colaborador != 'ativo': # Verifica se tem dados e se status é válido
            return {'Dados inexistentes'}
        if verify_password(data, colaborador):
            token = create_token(get_colaborador_cpf, colaborador.nome)
            return token
        else:
            return {'Senha incorreta'}