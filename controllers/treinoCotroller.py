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