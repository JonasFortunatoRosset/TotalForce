from flask import request, jsonify
from database.db import db
from models.modalidade import Modalidade

def modalidadeController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            modalidade = Modalidade(codigo=data['codigo'],nome=data['nome'],descricao=data['descricao'])
            db.session.add(modalidade)
            db.session.commit()
            return jsonify({'message': 'Nova modalidade inserida com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir nova modalidade. Erro: {}'.format(str(e))}), 400
    
    if request.method == 'GET':
        try:
            data = Modalidade.query.all()
            modalidades = {'Modalidades': [modalidade.to_dict() for modalidade in data]}
            return modalidades
        except Exception as e:
            return 'Não foi possível buscar modalidades. Error: {}'.format(str(e)), 405
    
    if request.method == 'DELETE':
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