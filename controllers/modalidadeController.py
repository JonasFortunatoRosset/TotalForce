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