from flask import jsonify, request
from database.db import db
from models.administrador import Administrador
import bcrypt
from hashes.funcoes import hash_senha, hash_cpf, atualizar_cpf_banco, atualizar_senha_banco

def administradorController():

    # Realiza o cadastro de um novo administrador
    if request.method == 'POST':
        try:
            data = request.get_json()
            # Pega dados de data
            senha = data['senha'] 
            cpf   = data['cpf'] 
            # transforma os dados em hash  
            senha_hash = hash_senha(senha)
            cpf_hash   = hash_cpf(cpf)
            administrador = Administrador(cpf=cpf_hash,nome=data['nome'],login=data['login'],senha=senha_hash)
            db.session.add(administrador)
            db.session.commit()
            return jsonify({'message': 'Administrador inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar Administrador. Erro: {}'.format(e)}), 400
    
    # Envia todos os colaboradores cadastrados para o front-end
    elif request.method == 'GET':
        try:
            data = Administrador.query.all()
            administradores = {'administrador': [administrador.to_dict() for administrador in data]}
            print(administradores)
            return administradores
        except Exception as e:
            return jsonify({'error': 'Não foi possível buscar nenhum administrador. Error: {}'.format(str(e))}), 405
    
    # Atualiza os dados do colaborador mediante seu código
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_administrador_codigo = data['codigo']
            put_administrador = Administrador.query.get(put_administrador_codigo)
            if put_administrador is None:
                    return jsonify({'error': 'Administrador não encontrado'}), 404
            put_administrador.nome     = data.get('nome'    , put_administrador.nome)
            put_administrador.login    = data.get('login'   , put_administrador.login)
            atualizar_cpf_banco(data  , put_administrador)
            atualizar_senha_banco(data, put_administrador)
            db.session.commit()
            return jsonify({'message': 'Administrador atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar administrador. Erro: {}'.format(e)}), 400
        
    # Deleta o administrador mediante seu código
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_administrador = Administrador.query.get(codigo)
            if delete_administrador is None:
                return jsonify({'Administrador': 'Administrador inexistente'}), 404
            db.session.delete(delete_administrador)
            db.session.commit()
            return jsonify({'message': 'Administrador deletado com sucesso'})
        except Exception as e:
            return jsonify({'error': 'Não foi possível deletar o administrador. Error: {}'.format(str(e))}), 405

