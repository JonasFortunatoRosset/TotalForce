import bcrypt
import jwt, bcrypt, base64, json, secrets, os

# Transformar dados em hash
def hash_cpf(cpf):
    cpf_byte = cpf.encode('utf-8')
    sal = bcrypt.gensalt()
    cpf_hash = bcrypt.hashpw(cpf_byte, sal)
    print(cpf_hash)
    return cpf_hash
def hash_senha(senha):
        senha_byte = senha.encode('utf-8')
        sal = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_byte, sal)
        return senha_hash

# Atualiza o cpf no banco
def atualizar_cpf_banco(data, dadosBanco): # verifica se o cpf é igual
    cpf = data['cpf']
    senha_banco = dadosBanco.cpf
    if bcrypt.checkpw(cpf.encode(), senha_banco.encode()) or data['cpf'] == dadosBanco.cpf:
        return
    else:
        cpf_byte = cpf.encode('utf-8')
        sal = bcrypt.gensalt()
        cpf_hash = bcrypt.hashpw(cpf_byte, sal)
        dadosBanco.cpf = cpf_hash

# Atualiza a senha no banco        
def atualizar_senha_banco(data, dadosBanco):
    senha = data['senha']
    senha_banco = dadosBanco.senha
    if bcrypt.checkpw(senha.encode(), senha_banco.encode()) or data['senha'] == dadosBanco.senha:
        return
    else:
        senha_byte = senha.encode('utf-8')
        sal = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_byte, sal)
        dadosBanco.senha = senha_hash

# Verificação de senha para realizar o login 
def verificar_senha(data, dadosBanco):
    senha = data['senha']
    senha_banco = dadosBanco[0].senha
    return bcrypt.checkpw(senha.encode(), senha_banco.encode())

# Criar token
def criar_token(cpf, nome):
        header = {"alg":"H256","type":"JWT"} # algoritimo e tipo de token 
        payload = {"sub": cpf, "nome": nome}
        secret_key = os.getenv("secret_key", secrets.token_hex(32))
        header_encoded = base64.urlsafe_b64encode(json.dumps(header).encode().rstrip(b'=')) # json => byte => base64
        payload_encoded = base64.urlsafe_b64encode(json.dumps(payload).encode().rstrip(b'='))
        assinatura = jwt.encode(payload, secret_key, algorithm='HS256')
        token = f"{header_encoded.decode()}.{payload_encoded.decode()}.{base64.urlsafe_b64encode(assinatura.encode()).rstrip(b'=').decode()}"
        print(f"meu token: {token}")
        return token

# Criar token usuário
# Criar token
def criar_token_usuario(login, nome):
        header = {"alg":"H256","type":"JWT"} # algoritimo e tipo de token 
        payload = {"sub": login, "nome": nome}
        secret_key = os.getenv("secret_key", secrets.token_hex(32))
        header_encoded = base64.urlsafe_b64encode(json.dumps(header).encode().rstrip(b'=')) # json => byte => base64
        payload_encoded = base64.urlsafe_b64encode(json.dumps(payload).encode().rstrip(b'='))
        assinatura = jwt.encode(payload, secret_key, algorithm='HS256')
        token = f"{header_encoded.decode()}.{payload_encoded.decode()}.{base64.urlsafe_b64encode(assinatura.encode()).rstrip(b'=').decode()}"
        print(f"meu token: {token}")
        return token


# Verificação de token -> válido ou não
def verificar_token(token, secret_key):
        try:
            decoded = jwt.decode(token, secret_key, algorithms=['HS256'])
            return decoded
        except jwt.InvalidTokenError:
            return 'Token inválido'


from flask import request, jsonify
from models.resultadoUsuario import ResultadoUsuario


def pesquisarResultadoController():
    if request.method == 'POST':
        data = request.get_json()
        usuario_codigo = data['codigo']
        data = ResultadoUsuario.query.filter_by(codusuario=usuario_codigo)
        resultadousuarios = {'ResultadoUsuario' : [resultado_usuario.to_dict() for resultado_usuario in data]}
        return resultadousuarios