from flask import jsonify, request
from database.db import db
from models.administrador import Administrador
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

def administradorController():

    def hashSenha(senha):
        senha_byte = senha.encode('utf-8')
        sal = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_byte, sal)
        return senha_hash


    if request.method == 'POST':
        try:
            data = request.get_json() # nome cpf login senha
            cpf = data['cpf']
            senha = data['senha']
            cpf_criptografado = encrypt_cpf(cpf)
            senha_hasheada = hashSenha(senha)
            administrador = Administrador(cpf=cpf_criptografado,nome=data['nome'],senha=senha_hasheada)
            db.session.add(administrador)
            db.session.commit()
            return ({'message' : 'Administrador inserido com sucesso'})
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo administrador. Erro: {}'.format(str(e))}), 400
        
    elif request.method == 'GET':
        try:
            data = Administrador.query.all()
            administradores = {'administrador': [administrador.to_dict() for administrador in data]}
            return administradores
        except Exception as e:
            return 'Não foi possível buscar nenhum administrador. Error: {}'.format(str(e)), 405
    
    elif  request.method == 'PUT':
        def verify_password(dados, administrador_banco):
            senha = dados['senha']
            senha_banco = administrador_banco.senha
            if bcrypt.checkpw(senha.encode(), senha_banco.encode()) or dados['senha'] == administrador_banco.senha:
                return
            else:
                senha_byte = senha.encode('utf-8')
                sal = bcrypt.gensalt()
                senha_hash = bcrypt.hashpw(senha_byte, sal)
                administrador_banco.senha    = senha_hash
                return
            

        try:
            data = request.get_json()
            put_admistrador_codigo = data['codigo']
            senha = data['senha']
            cpf_criptografado = encrypt_cpf(data['cpf'])
            put_administrador = Administrador.query.get(put_admistrador_codigo)
            if put_administrador is None:
                return {'error': 'Administrador não encontrado'}, 404
            verify_password(data, put_administrador)
            if cpf_criptografado != put_administrador.cpf:
                put_administrador.cpf  = cpf_criptografado
            put_administrador.nome  = data.get('nome', put_administrador.nome)
            db.session.commit()
            return 'Admistrador atualizado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Administrador. Erro{}'.format(e)}, 400
    
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_administrador = Administrador.query.get(codigo)
            if delete_administrador is None:
                return {'Administrador': 'Administrador inexistente'}, 404
            db.session.delete(delete_administrador)
            db.session.commit()
            return 'Administrador deletado com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o administrador. Error: {}'.format(str(e)), 405