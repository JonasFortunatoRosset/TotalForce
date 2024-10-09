from flask import request, jsonify, session
from database.db import db
from models.usuario import Usuario
from cryptography.fernet import Fernet
import bcrypt


def encrypt_cpf(cpf):
        key = b'W0uf9GslpYy9upNj7bWjYFgD7K2S5uOmbcV76vM5GF0='
        cipher_suite = Fernet(key)
        cpf_byte = cpf.encode('utf-8')
        encrypted_cpf = cipher_suite.encrypt(cpf_byte)
        print(encrypted_cpf)
        return encrypted_cpf.decode('utf-8')

def decrypt_cpf(encrypted_cpf):
    key = b'W0uf9GslpYy9upNj7bWjYFgD7K2S5uOmbcV76vM5GF0='
    cipher_suite = Fernet(key)
    decrypted_cpf = cipher_suite.decrypt(encrypted_cpf)
    return decrypted_cpf


def usuariosController():
    
    def hashSenha(senha):
        senha_byte = senha.encode('utf-8')
        sal = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_byte,sal) 
        return senha_hash
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            senha = data['senha']
            cpf = data['cpf']
            senha_hasheada = hashSenha(senha)
            cpf_criptografado = encrypt_cpf(cpf)
            print(data)
            usuario = Usuario(cpf=cpf_criptografado,nome=data['nome'],endereco=data['endereco'],senha=senha_hasheada,peso=data['peso'],altura=data['altura'],status=data['status'])
            db.session.add(usuario)
            db.session.commit()
            return jsonify({'message': 'Usuario cadastrado'}),200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo usuario. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
        try:
            data = Usuario.query.all()
            usuarios = {'usuario': [usuario.to_dict() for usuario in data]} 
            return usuarios
        except Exception as e:
            return 'Não foi possível buscar usuários. Error: {}'.format(str(e)), 405
    
    
    elif request.method == 'PUT':
        def verify_password(dados, usuario_banco):
            senha = dados['senha']
            senha_banco = usuario_banco.senha
            if bcrypt.checkpw(senha.encode(), senha_banco.encode()) or dados['senha'] == usuario_banco.senha:
                return
            else:
                senha_byte = senha.encode('utf-8')
                sal = bcrypt.gensalt()
                senha_hash = bcrypt.hashpw(senha_byte, sal)
                usuario_banco.senha    = senha_hash
                return


        try:
            data           = request.get_json() # Resposta enviada do front
            put_usuario_codigo = data['codigo'] # Pega o codigo dela
            cpf = data['cpf']
            cpf_criptografado = encrypt_cpf(cpf)
            put_usuario    = Usuario.query.get(put_usuario_codigo) # Encontra o usuario a ter seus dados alterados
            if put_usuario is None:
                return {'Usuario nao encontrado'}
            put_usuario.nome     = data.get('nome', put_usuario.nome)
            if cpf_criptografado != put_usuario.cpf:
                put_usuario.cpf      = cpf_criptografado
            put_usuario.endereco = data.get('endereco', put_usuario.endereco)
            verify_password(data, put_usuario)
            put_usuario.peso     = data.get('peso', put_usuario.peso)
            put_usuario.altura   = data.get('altura', put_usuario.altura)
            put_usuario.status   = data.get('status', put_usuario.status)
            db.session.commit()
            return jsonify({'message': 'Usuario alterado com sucesso'}), 200
        except Exception as e:
            return {'error': 'Erro ao alterar o usuario. Error{}'.format(e)}, 400
    
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_usuario = Usuario.query.get(codigo)
            if delete_usuario is None:
                return {'error': 'Usuário inexistente'}, 404
            db.session.delete(delete_usuario)
            db.session.commit()
            return 'Usuário deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar usuário. Erro{}'.format(e)}, 400