from flask import request, jsonify, session
from database.db import db
from models.usuario import Usuario

def pesquisarCodplanoUsuarioController():
    if request.method == 'GET':
        try:
            codusuario = request.args.get('codigo')
            usuario = Usuario.query.filter_by(codigo=codusuario).first()
            response = {
                'codplano': usuario.codplano
            }
            return jsonify(response)
        except Exception as e:
            return jsonify({'Não foi possível buscar usuario. Error: {}'.format(str(e))}), 405
        