from flask import jsonify, request
from database.db import db
from models.administrador import Administrador

def administradorController():

    if request.method == 'POST':
        try:
            data = request.get_json() # nome cpf login senha
            administrador = Administrador(codigo=data['codigo'],nome=data['nome'],cpf=data['cpf'],login=data['login'],senha=data['senha'])
            db.session.add(administrador)
            db.session.commit()
            return ({'message' : 'Administrador inserido com sucesso'})
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo administrador. Erro: {}'.format(str(e))}), 400
        
    if request.method == 'GET':
        try:
            data = Administrador.query.all()
            administradores = {'administrador': [administrador.to_dict() for administrador in data]}
            return administradores
        except Exception as e:
            return 'Não foi possível buscar nenhum administrador. Error: {}'.format(str(e)), 405
    
    if  request.method == 'PUT':
        try:
            data = request.get_json()
            put_admistrador_id = data['codigo']
            put_administrador = Administrador.query.get(put_admistrador_id)
            if put_administrador is None:
                return {'error': 'Administrador não encontrado'}, 404
            put_administrador.nome  = data.get('nome', put_administrador.nome)
            put_administrador.cpf   = data.get('cpf', put_administrador.cpf)
            put_administrador.login = data.get('login', put_administrador.login)
            put_administrador.senha = data.get('senha', put_administrador.senha)
            db.session.commit()
            return 'Admistrador atualizado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Administrador. Erro{}'.format(e)}, 400
    
    if request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_administrador = Administrador.query.get(codigo)
            if delete_administrador is None:
                return {'Administrador': 'Administrador inexistente'}, 404
            db.session.delete(codigo)
            db.session.commit()
            return 'Administrador deletado com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o administrador. Error: {}'.format(str(e)), 405