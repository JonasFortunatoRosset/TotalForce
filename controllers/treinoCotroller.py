from flask import request, jsonify
from database.db import db
from models.treino import Treino

def treinoController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            treino = Treino(codigo=data['codigo'],nome=data['nome'],descricao=data['descricao'],codusuario=['codusuario'],proprieda=data['propriedade'],codmodalidade=data['codmodalidade'])
            db.session.add(treino)
            db.session.commit()
            return jsonify({'message': 'Treino cadastrado com sucesso'}),200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir nova modalidade. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
        try:
            data = Treino.query.all()
            treinos = {'Treino' : [treino.to_dict() for treino in data]}
            return treinos
        except Exception as e:
                return 'Não foi possível buscar algum treino. Error: {}'.format(str(e)), 405
    
    elif request.method == 'PUT':
        try:
            pass
        except Exception as e:
            pass   
    
    elif request.method == 'DELETE':
        try:
            codigo = request.get.args('codigo')
            delete_treino = Treino.query.get(codigo)
            if delete_treino is None:
                return {'error': 'Treino inexistente'}, 404
            db.session.delete(delete_treino)
            db.session.commit()
            return 'Treino deletado com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o treino. Error: {}'.format(str(e)), 405