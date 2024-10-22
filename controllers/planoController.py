from models.plano import Plano
from database.db import db
from flask import request, jsonify, session

def planoController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data['nome'])
            plano = Plano(nome=data['nome'])
            db.session.add(plano)
            db.session.commit()
            return jsonify({'message': 'Plano cadastrado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo plano. Erro: {}'.format(str(e))}), 400
    
    if request.method == 'GET':
        try:
            data = Plano.query.all()
            planos = {'Plano' : [plano.to_dict() for plano in data]}
            return planos
        except Exception as e:
                return 'Não foi possível buscar plano. Error: {}'.format(str(e)), 405
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_plano_codigo = data['codigo']
            put_plano    = Plano.query.get(put_plano_codigo)
            if put_plano is None:
                return {'error': 'Plano não encontrada'}
            put_plano.nome      = data.get('nome', put_plano.nome)
            db.session.commit()
            return {'message': 'Plano alterado com sucesso'}, 200
        except Exception as e:
            return {'error': 'Erro ao alterar plano. Errror{}'.format(e)}, 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_plano = Plano.query.get(codigo)
            if delete_plano is None:
                return jsonify({'message': 'plano inexistente'}), 404
            db.session.delete(delete_plano)
            db.session.commit()
            return 'Plano deletada com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o plano. Error {}'.format(str(e)), 405