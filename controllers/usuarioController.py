from flask import request, jsonify
from database.db import db
from models.usuario import Usuario

def usuariosController():
    if request.method == 'POST':
        data = request.get_json()
        usuario = Usuario(codigo=data['codigo'],nome=data['nome'],cpf=data['cpf'],endereco=data['endereco'],cidade=data['cidade'],senha=data['senha'],peso=data['peso'],altura=data['altura'])
        db.session.add(usuario)
        db.session.commit()
        return jsonify({'message': 'Usuario cadastrado'}),200
    
    
    elif request.method == 'GET':
        try:
            data = Usuario.query.all()
            usuarios = {'usuario': [usuario.to_dict() for usuario in data]} 
            return usuarios
        except Exception as e:
            return 'Não foi possível buscar usuários. Error: {}'.format(str(e)), 405
    
    
    elif request.method == 'PUT':
        pass
    
    
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_usuario = Usuario.query.get(codigo)
            if delete_usuario is None:
                return {'error': 'Usuário inexistente'}, 404
            db.session.delete(delete_usuario)
            db.session.commit()
            return 'Usuário deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar usuário. Erro{}'.format(e)}, 400