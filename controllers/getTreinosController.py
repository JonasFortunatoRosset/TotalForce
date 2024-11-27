from flask import request, jsonify, session
from database.db import db
from models.treino import Treino

def getTreinoController():
    if request.method == 'GET':
        try:
            codplano = request.args.get('codplano')
            treino = Treino.query.filter_by(codplano=codplano)
            if treino is None:
                return jsonify({'message': 'Treino não encontrado.'}), 404
            response = {
                'treino1': treino[0].nome,  
                'treino2': treino[1].nome,
                'treino3': treino[2].nome,
                'codtreino1': treino[0].codigo,
                'codtreino2': treino[1].codigo,
                'codtreino3': treino[2].codigo,
            }
            return jsonify(response)
        except Exception as e:
            return jsonify({'message': 'Não foi possível buscar treino. Error: {}'.format(str(e))}), 500
