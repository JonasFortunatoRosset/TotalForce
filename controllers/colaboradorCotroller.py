from flask import request, jsonify
from database.db import db
from models.colaborador import Colaborador

def colaboradorController():
    if request.method == 'POST':
        try:
            data = request.get_json() # Converte os dados enviados pelo cliente em formato json para um dicionário python NOME CPF ENDERECO CIDADE SENHA
            colaborador = Colaborador(codigo=data['codigo'],nome=data['nome'],cpf=data['cpf'],endereco=data['endereco'],cidade=data['cidade'],senha=data['senha'])
            db.session.add(colaborador) # Executa o código sql no banco
            db.session.commit()
            return ({'message': 'Colaborador novo inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo colaborador. Erro: {}'.format(str(e))}), 400
    
    if request.method == 'GET':
        try:
            data = Colaborador.query.all()
            colaboradores = {'colaborador': [colaborador.to_dict() for colaborador in data]}
            return colaboradores
        except Exception as e:
            return 'Não foi possível buscar colaboradores. Error: {}'.format(str(e)), 405
    
    if request.method == 'DELETE':
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