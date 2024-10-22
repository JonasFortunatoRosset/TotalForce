from flask import request, jsonify
from models.usuario import Usuario
import jwt, bcrypt, base64, json, secrets, os


def loginUsuarioController():
        
    def encrypt_cpf(cpf):
        key = '842$#@$@#fwefweFEWFfewf$#$2344DEWDWE'
        cipher_suite = Fernet(key)
        cpf_byte = cpf.encode('utf-8')
        encrypted_cpf = cipher_suite.encrypt(cpf_byte)
        return encrypted_cpf

    def verify_password(dados, usuario_banco):
        senha = dados['senha']
        senha_banco = usuario_banco[0].senha
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
        cpf_usuario = encrypt_cpf(get_usuario_cpf)
        usuario = Usuario.query.filter_by(cpf=cpf_usuario) # Pega todos os dados do banco do usuario
        if usuario[0].status != 'ativo':
            return jsonify({'message': 'Status inválido para login'})
        if usuario is None: # Verifica se retornou um resultado
            return jsonify({'message': 'Dados não existentes no banco'})
            
        if verify_password(data, usuario): # Verifica se a senha do cpf é igual a do form
            token = create_token(get_usuario_cpf, usuario[0].nome)
            return token
            
        else: 
            return jsonify({'message': 'Senha incorreta'})