from flask import request, jsonify
from database.db import db
from models.colaborador import Colaborador
import bcrypt

def colaboradorController():
    
    if request.method == 'POST':
        try:
            data = request.get_json() # Converte os dados enviados pelo cliente em formato json para um dicionário python NOME CPF ENDERECO CIDADE SENHA
            senha = data['senha']
            senha_byte = senha.encode('utf-8')
            sal = bcrypt.gensalt()
            senha_hash = bcrypt.hashpw(senha_byte, sal)
            colaborador = Colaborador(codigo=data['codigo'],nome=data['nome'],cpf=data['cpf'],endereco=data['endereco'],cidade=data['cidade'],senha=senha_hash)
            db.session.add(colaborador) # Executa o código sql no banco
            db.session.commit()
            return ({'message': 'Colaborador novo inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo colaborador. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
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
            data = request.get_json() # coletar os dados novos
            put_colaborador_id = data.get('codigo')
            senha = data['senha']
            put_colaborador = Colaborador.query.get(put_colaborador_id)
            if put_colaborador is None:
                return {'error': 'Colaborador não encontrado'}, 404
            put_colaborador.nome = data.get('nome', put_colaborador.nome)
            put_colaborador.cpf = data.get('cpf', put_colaborador.cpf)
            put_colaborador.endereco = data.get('endereco', put_colaborador.endereco)
            put_colaborador.cidade = data.get('cidade', put_colaborador.cidade)
            verify_password(data, put_colaborador)
            db.session.commit()
            return 'Colaborador alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar os dados do colaborador. Erro{}'.format(e)}, 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_colaborador = Colaborador.query.get(codigo)
            if delete_colaborador is None:
                return {'Colaborador': 'Colaborador inexistente'}, 404
            db.session.delete(delete_colaborador)
            db.session.commit()
            return 'Colaborador deletado com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o colaborador. Error: {}'.format(str(e)), 405