from flask import request, jsonify
from models.administrador import Administrador
import jwt, bcrypt, base64, json, secrets, os
from cryptography.fernet import Fernet


def loginAdministradorController():
    # Função para encriptar CPF
    def encrypt_cpf(cpf):
        key = b'W0uf9GslpYy9upNj7bWjYFgD7K2S5uOmbcV76vM5GF0='  # Sua chave original
        cipher_suite = Fernet(key)
        cpf_byte = cpf.encode('utf-8')
        encrypted_cpf = cipher_suite.encrypt(cpf_byte)
        return encrypted_cpf

    # Função para verificar a senha com bcrypt
    def verify_password(dados, administrador_banco):
        senha = dados['senha']
        senha_banco = administrador_banco.senha
        return bcrypt.checkpw(senha.encode(), senha_banco)

    # Função para criar um token JWT
    def create_token(cpf, nome):
        payload = {"sub": cpf, "nome": nome}
        secret_key = os.getenv("secret_key", secrets.token_hex(32))
        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return token

    if request.method == 'POST':
        data = request.get_json()
        get_administrador_cpf = data['cpf']
        cpf_criptografado = encrypt_cpf(get_administrador_cpf).decode('utf-8')

        # Buscar administrador pelo CPF criptografado
        administrador = Administrador.query.filter_by(cpf=cpf_criptografado).first()

        if administrador is None:
            return jsonify({'message': 'Administrador não encontrado'}), 404

        # Verificar senha
        if verify_password(data, administrador):
            token = create_token(get_administrador_cpf, administrador.nome)
            return jsonify({'token': token}), 200
        else:
            return jsonify({'message': 'Senha incorreta'}), 401
