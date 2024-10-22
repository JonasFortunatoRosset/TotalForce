from flask import request, jsonify
from database.db import db
from models.colaborador import Colaborador
import bcrypt
from cryptography.fernet import Fernet

def encrypt_cpf(cpf):
        key = '842$#@$@#fwefweFEWFfewf$#$2344DEWDWE'
        cipher_suite = Fernet(key)
        cpf_byte = cpf.encode('utf-8')
        encrypted_cpf = cipher_suite.encrypt(cpf_byte)
        return encrypted_cpf

def decrypt_cpf(encrypted_cpf):
    key = '842$#@$@#fwefweFEWFfewf$#$2344DEWDWE'
    cipher_suite = Fernet(key)
    decrypted_cpf = cipher_suite.decrypt_cpf(encrypted_cpf)


def colaboradorController():

    def hashSenha(senha):
        senha_byte = senha.encode('utf-8')
        sal = bcrypt.gensalt()
        senha_hash = bcrypt.hashpw(senha_byte, sal)
        return senha_hash


    if request.method == 'POST':
        try:
            data = request.get_json() # Converte os dados enviados pelo cliente em formato json para um dicionário python NOME CPF ENDERECO CIDADE SENHA
            cpf = data['cpf']
            senha = data['senha']
            cpf_criptografado = encrypt_cpf(cpf)
            senha_hasheada = senha_hash(senha)    
            colaborador = Colaborador(cpf=cpf_criptografado,nome=data['nome'],endereco=data['endereco'],senha=senha_hasheada)
            db.session.add(colaborador) # Executa o código sql no banco
            db.session.commit()
            return ({'message': 'Colaborador novo inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo colaborador. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET': # TESTARRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
        try:
            data = Colaborador.query.all()
            cpf = data['cpf']
            cpf_descriptografado = decrypt_cpf(cpf)
            data['cpf'] = cpf_descriptografado
            colaboradores = {'colaborador': [colaborador.to_dict() for colaborador in data]}
            return colaboradores
        except Exception as e:
            return jsonify({'Não foi possível buscar colaboradores. Error: {}'.format(str(e))}), 405
    
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
            put_colaborador_cpf = data.get('cpf')
            cpf_criptografado = encrypt_cpf(put_colaborador_cpf)
            put_colaborador = Colaborador.query.get(put_colaborador_cpf)
            put_colaborador_id = data.get('codigo')
            senha = data['senha']
            put_colaborador = Colaborador.query.get(put_colaborador_id)
            if put_colaborador is None:
                return {'error': 'Colaborador não encontrado'}, 404
            put_colaborador.nome = data.get('nome', put_colaborador.nome)
            put_colaborador.endereco = data.get('endereco', put_colaborador.endereco)
            put_colaborador.senha = data.get('senha', put_colaborador.senha)
            put_colaborador.cidade = data.get('cidade', put_colaborador.cidade)
            verify_password(data, put_colaborador)
            db.session.commit()
            return jsonify({'Colaborador alterado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar os dados do colaborador. Erro{}'.format(e)}), 400

    elif request.method == 'DELETE':
        try:
            cpf = request.args.get('cpf')
            cpf_enc = encrypt_cpf(cpf)
            delete_colaborador = Colaborador.query.get(cpf_enc) # delete_colaborador = Colaborador.query.filter_by(cpf=cpf_enc).first()
            if delete_colaborador is None:
                return {'Colaborador': 'Colaborador inexistente'}, 404
            db.session.delete(delete_colaborador)
            db.session.commit()
            return jsonify({'Colaborador deletado com sucesso'})
        except Exception as e:
            return jsonify({'Não foi possível deletar o colaborador. Error: {}'.format(str(e))}), 405