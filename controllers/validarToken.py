from models.login import Login
from flask import request, jsonify
import jwt, os

def validarToken():
    if request.method == 'POST':
        data = request.get_json()
        token_front = data['token']
        dados_banco = Login.query.filter_by(token=token_front).all()
        payload_front = jwt.decode(token_front, os.getenv(dados_banco['chave_secreta']), algorithms=["HS256"])
        payload_banco = jwt.decode(dados_banco['token'], os.getenv(dados_banco['chave_secreta']), algorithms=["HS256"])
        if payload_front['sub'] == payload_banco['sub']:
            return True
        else:
            return False