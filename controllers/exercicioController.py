from flask import request, jsonify
from database.db import db
from models.exercicio import Exercicio

def exercicioController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            exercicio = Exercicio(codigo=data['codigo'],nome=data['nome'],descricao=['descricao'],codtreino=data['codtreino'])
            db.session.add(exercicio)
            db.session.commit()
            return ({'message': 'Exercio novo inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo exercício. Erro: {}'.format(str(e))}), 400