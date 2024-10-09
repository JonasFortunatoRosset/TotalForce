from flask import request, jsonify
from database.db import db
from models.colaborador import Colaborador
import bcrypt
from cryptography.fernet import Fernet


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


def colaboradorController():

    def hashSenha(senha):
        senha_byte = senha.encode('utf-8')
        sal = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_byte, sal)
        return senha_hash


    if request.method == 'POST':
        try:
            data = request.get_json() # Converte os dados enviados pelo cliente em formato json para um dicionário python NOME CPF ENDERECO SENHA
            print(data)
            cpf = data['cpf']
            senha = data['senha']
            cpf_criptografado = encrypt_cpf(cpf)
            senha_hasheada = hashSenha(senha)    
            colaborador = Colaborador(cpf=cpf_criptografado,nome=data['nome'],endereco=data['endereco'],senha=senha_hasheada)
            db.session.add(colaborador) # Executa o código sql no banco
            db.session.commit()
            return ({'message': 'Colaborador novo inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo colaborador. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET': # TESTARRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
        try:
            data = Colaborador.query.all()
            colaboradores = {'colaborador': [colaborador.to_dict() for colaborador in data]}
            return colaboradores
        except Exception as e:
            return 'Não foi possível buscar colaboradores. Error: {}'.format(str(e)), 405
    
    elif request.method == 'PUT':
        def verify_password(dados, colaborador_banco):
            senha = dados['senha']
            senha_banco = colaborador_banco.senha
            if bcrypt.checkpw(senha.encode(), senha_banco.encode()) or dados['senha'] == colaborador_banco.senha:
                return
            else:
                senha_byte = senha.encode('utf-8')
                sal = bcrypt.gensalt()
                senha_hash = bcrypt.hashpw(senha_byte, sal)
                colaborador_banco.senha    = senha_hash
                return
            

        try:
            data = request.get_json()
            put_colaborador_codigo = data['codigo']
            print(data)
            put_colaborador = Colaborador.query.get(put_colaborador_codigo)
            if put_colaborador is None:
                return {'error': 'Colaborador não encontrado'}, 404
            senha = data['senha']
            cpf = data['cpf']
            cpf_criptografado = encrypt_cpf(cpf)
            if cpf_criptografado != put_colaborador.cpf:
                put_colaborador.cpf = cpf_criptografado
            put_colaborador.nome = data.get('nome', put_colaborador.nome)
            put_colaborador.endereco = data.get('endereco', put_colaborador.endereco)
            verify_password(data, put_colaborador)
            db.session.commit()
            return 'Colaborador alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar os dados do colaborador. Erro{}'.format(e)}, 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_colaborador = Colaborador.query.get(codigo) # delete_colaborador = Colaborador.query.filter_by(cpf=cpf_enc).first()
            if delete_colaborador is None:
                return {'Colaborador': 'Colaborador inexistente'}, 404
            db.session.delete(delete_colaborador)
            db.session.commit()
            return 'Colaborador deletado com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o colaborador. Error: {}'.format(str(e)), 405