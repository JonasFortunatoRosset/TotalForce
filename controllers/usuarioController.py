from flask import request, jsonify, session
from database.db import db
from models.usuario import Usuario
import bcrypt

def usuariosController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            senha = data['senha']
            senha_byte = senha.encode('utf-8')
            sal = bcrypt.gensalt()
            senha_hash = bcrypt.hashpw(senha_byte,sal) 
            usuario = Usuario(codigo=data['codigo'],nome=data['nome'],cpf=data['cpf'],endereco=data['endereco'],cidade=data['cidade'],senha=senha_hash,peso=data['peso'],altura=data['altura'])
            db.session.add(usuario)
            db.session.commit()
            return jsonify({'message': 'Usuario cadastrado'}),200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo usuario. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
        try:
            data = Usuario.query.all()
            usuarios = {'usuario': [usuario.to_dict() for usuario in data]} 
            return usuarios
        except Exception as e:
            return 'Não foi possível buscar usuários. Error: {}'.format(str(e)), 405
    
    
    elif request.method == 'PUT':
        def verify_password(dados, usuario_banco):
            senha = dados['senha']
            senha_banco = usuario_banco.senha
            if bcrypt.checkpw(senha.encode(), senha_banco.encode()) or dados['senha'] == usuario_banco.senha:
                return
            else:
                senha_byte = senha.encode('utf-8')
                sal = bcrypt.gensalt()
                senha_hash = bcrypt.hashpw(senha_byte, sal)
                usuario_banco.senha    = senha_hash
                return


        try:
            data           = request.get_json() # Resposta enviada do front
            print(data)
            put_usuario_id = data['codigo'] # Pega o codigo dela
            put_usuario    = Usuario.query.get(put_usuario_id) # Encontra o usuario a ter seus dados alterados
            if put_usuario is None:
                return {'Usuario nao encontrado'}
            put_usuario.nome     = data.get('nome', put_usuario.nome)
            put_usuario.cpf      = data.get('cpf', put_usuario.cpf)
            put_usuario.endereco = data.get('endereco', put_usuario.endereco)
            put_usuario.cidade   = data.get('cidade', put_usuario.cidade)
            verify_password(data, put_usuario)
            put_usuario.peso     = data.get('peso', put_usuario.peso)
            put_usuario.altura   = data.get('altura', put_usuario.altura)
            db.session.commit()
            return jsonify({'message': 'Usuario alterado com sucesso'}), 200
        except Exception as e:
            return {'error': 'Erro ao alterar o usuario. Error{}'.format(e)}, 400
    
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