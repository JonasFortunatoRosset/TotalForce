from flask import request, jsonify, session
from database.db import db
from models.usuario import Usuario
from cryptography.fernet import Fernet
import bcrypt
from hashes.funcoes import hash_senha, atualizar_senha_banco


def usuariosController():
    # Realiza o cadastro de um novo usuario
    if request.method == 'POST':
        try:
            data = request.get_json()
            # Pega dados de data
            senha = data['senha'] 
            # transforma os dados em hash  
            senha_hash = hash_senha(senha)
            usuario = Usuario(nome=data['nome'],endereco=data['endereco'],login=data['login'],senha=senha_hash,peso=data['peso'],altura=data['altura'],codplano=data['codplano'],status=data['status'])
            db.session.add(usuario)
            db.session.commit()
            return jsonify({'Usuário cadastrado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar usuário. Erro: {}'.format(e)}), 400
    
    # Envia todos os usuarios cadastrados para o front-end
    if request.method == 'GET':
        try:
            data = Usuario.query.all()
            usuarios = {'usuario': [usuario.to_dict() for usuario in data]}
            return usuarios
        except Exception as e:
            return jsonify({'Não foi possível buscar usuario. Error: {}'.format(str(e))}), 405
    
    # Atualiza os dados do colaborador mediante seu código
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_usuario_codigo = data['codigo']
            print(f"codplano front: {data['codplano']}")
            print(f"cod usuario: {put_usuario_codigo}")
            put_usuario = Usuario.query.get(put_usuario_codigo)
            print(f"codplano atual {put_usuario.codplano}")
            if put_usuario is None:
                    return jsonify({'error': 'Usuário não encontrado'}), 404
            put_usuario.nome     = data.get('nome'    , put_usuario.nome)
            put_usuario.endereco = data.get('endereco', put_usuario.endereco)
            put_usuario.login    = data.get('login'   , put_usuario.login)
            put_usuario.peso     = data.get('peso'    , put_usuario.peso)
            put_usuario.altura   = data.get('altura'  , put_usuario.nome)
            put_usuario.codplano = data.get('codplano', put_usuario.codplano)
            put_usuario.status   = data.get('status'  , put_usuario.status)
            atualizar_senha_banco(data, put_usuario)
            db.session.commit()
            return jsonify({'message': 'Usuário atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar usuário. Erro: {}'.format(e)}), 400
    
    # Deleta o colaborador mediante seu código
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_usuario = Usuario.query.get(codigo)
            if delete_usuario is None:
                return jsonify({'Usuario': 'Usuario inexistente'}), 404
            db.session.delete(delete_usuario)
            db.session.commit()
            return jsonify({'Usuário deletado com sucesso'})
        except Exception as e:
            return jsonify({'Não foi possível deletar o usuário. Error: {}'.format(str(e))}), 405