from flask import request, jsonify
from database.db import db
from models.login import Login
import jwt, os


def invalidarToken():
    if request.method == 'POST':
        data = request.get_json()
        token_front = data['token']
        dados_banco = Login.query.filter_by(token=token_front).all()
        if dados_banco is None:
            return jsonify({'message': 'Token inexistente'})
        payload_front = jwt.decode(token_front, os.getenv(dados_banco['chave_secreta']), algorithms=["HS256"])
        payload_banco = jwt.decode(dados_banco['token'], os.getenv(dados_banco['chave_secreta']), algorithms=["HS256"])
        if payload_front['sub'] == payload_banco['sub']:
            db.session.delete(dados_banco)
            db.session.commit()
            return jsonify({'message': 'Token invalidado com sucesso'}), 200
        else:
            return jsonify({'Erro': 'Erro ao deletar token'})