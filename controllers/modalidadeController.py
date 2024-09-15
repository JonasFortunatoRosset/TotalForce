from flask import request, jsonify
from database.db import db
from models.modalidade import Modalidade

def modalidadeController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            modalidade = Modalidade(codigo=data['codigo'],nome=data['nome'],descricao=data['descricao'])
            db.session.add(modalidade)
            db.session.commit()
            return jsonify({'message': 'Nova modalidade inserida com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir nova modalidade. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
        try:
            data = Modalidade.query.all()
            modalidades = {'Modalidades': [modalidade.to_dict() for modalidade in data]}
            return modalidades
        except Exception as e:
            return 'Não foi possível buscar modalidades. Error: {}'.format(str(e)), 405
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_modalidade_id = data['codigo']
            put_modalidade    = Modalidade.query.get(put_modalidade_id)
            if put_modalidade is None:
                return {'error': 'Modalidade não encontrada'}
            put_modalidade.nome      = data.get('nome', put_modalidade.nome)
            put_modalidade.descricao = data.get('descricao', put_modalidade.descricao)
            db.session.commit()
            return {'Modalidade alterada com sucesso'}, 200
        except Exception as e:
            return {'error': 'Erro ao alterar modalidade. Errror{}'.format(e)}, 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_modalidade = Modalidade.query.get(codigo)
            if delete_modalidade is None:
                return {'Treino': 'treino inexistente'}, 404
            db.session.delete(delete_modalidade)
            db.session.commit()
            return 'Modalidade deletada com sucesso'
        except Exception as e:
            return 'Não foi possível deletar a modalidade. Error {}'.format(str(e)), 405