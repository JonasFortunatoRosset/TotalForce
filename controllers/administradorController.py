from flask import jsonify, request
from database.db import db
from models.administrador import Administrador
from cryptography.fernet import Fernet 
import bcrypt
from hashes.funcoes import hash_cpf, verificar_cpf_cadastro, hashSenha

def administradorController():

    if request.method == 'POST':
        try:
            data = request.get_json()  # nome cpf login senha
            if not all(key in data for key in ['nome', 'cpf', 'senha']):
                return jsonify({'error': 'Nome, CPF e senha são obrigatórios'}), 400
            cpf = data['cpf']
            senha = data['senha']
            cpf_hash = hash_cpf(cpf)
            senha_hash = hashSenha(senha)
            administrador = Administrador(cpf=cpf_hash, nome=data['nome'], senha=senha_hash)
            db.session.add(administrador)
            db.session.commit()
            return {'message': 'Administrador inserido com sucesso'}
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo administrador. Erro: {}'.format(str(e))}), 400

    elif request.method == 'GET':
        try:
            data = Administrador.query.all()
            administradores = {'administrador': [administrador.to_dict() for administrador in data]}
            return administradores
        except Exception as e:
            return 'Não foi possível buscar nenhum administrador. Error: {}'.format(str(e)), 405

    elif request.method == 'PUT':
        def verify_password(dados, administrador_banco):
            senha = dados['senha']
            senha_banco = administrador_banco.senha
            if bcrypt.checkpw(senha.encode(), senha_banco.encode()) or dados['senha'] == administrador_banco.senha:
                return
            else:
                senha_byte = senha.encode('utf-8')
                sal = bcrypt.gensalt()
                senha_hash = bcrypt.hashpw(senha_byte, sal)
                administrador_banco.senha = senha_hash

        try:
            data = request.get_json()
            put_administrador_codigo = data['codigo']
            cpf = data['cpf']
            put_administrador = Administrador.query.get(put_administrador_codigo)
            if put_administrador is None:
                return {'error': 'Administrador não encontrado'}, 404
            
            # Verifica e atualiza a senha se necessário
            verify_password(data, put_administrador)
            
            # Verifica e atualiza o CPF
            if not verificar_cpf_cadastro(cpf, put_administrador.cpf):
                put_administrador.cpf = hash_cpf(cpf)  # Atualiza o CPF se necessário

            put_administrador.nome = data.get('nome', put_administrador.nome)
            db.session.commit()
            return 'Administrador atualizado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Administrador. Erro: {}'.format(e)}, 400

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
