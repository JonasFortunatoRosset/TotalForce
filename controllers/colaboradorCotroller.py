from flask import request, jsonify
from database.db import db
from models.colaborador import Colaborador
import bcrypt
from hashes.funcoes import hash_senha, hash_cpf, atualizar_cpf_banco, atualizar_senha_banco

def colaboradorController():

    # Realiza o cadastro de um novo colaborador
    if request.method == 'POST':
        try:
            data = request.get_json()
            # Pega dados de data
            senha = data['senha'] 
            cpf   = data['cpf'] 
            # transforma os dados em hash  
            senha_hash = hash_senha(senha)
            cpf_hash   = hash_cpf(cpf)
            colaborador = Colaborador(cpf=cpf_hash,nome=data['nome'],endereco=data['endereco'],login=data['login'], senha=senha_hash, status=data['status'])
            db.session.add(colaborador)
            db.session.commit()
            return jsonify({'message': 'Administrador atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar Administrador. Erro: {}'.format(e)}), 400
    
    # Envia todos os colaboradores cadastrados para o front-end
    elif request.method == 'GET':
        try:
            data = Colaborador.query.all()
            colaboradores = {'colaborador': [colaborador.to_dict() for colaborador in data]}
            return colaboradores
        except Exception as e:
            return jsonify({'message': 'Não foi possível buscar nenhum colaboradores. Error: {}'.format(str(e))}), 405
    
    # Atualiza os dados do colaborador mediante seu código
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_colaborador_codigo = data['codigo']
            put_colaborador = Colaborador.query.get(put_colaborador_codigo)
            if put_colaborador is None:
                    return jsonify({'error': 'Colaborador não encontrado'}), 404
            put_colaborador.nome     = data.get('nome'    , put_colaborador.nome)
            put_colaborador.endereco = data.get('endereco', put_colaborador.endereco)
            put_colaborador.login    = data.get('login'   , put_colaborador.login)
            atualizar_cpf_banco(data, put_colaborador)
            atualizar_senha_banco(data, put_colaborador)
            db.session.commit()
            return jsonify({'message': 'Colaborador atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar colaborador. Erro: {}'.format(e)}), 400
    
    # Deleta o colaborador mediante seu código
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_colaborador = Colaborador.query.get(codigo)
            if delete_colaborador is None:
                return jsonify({'Colaborador': 'Colaborador inexistente'}), 404
            db.session.delete(delete_colaborador)
            db.session.commit()
            return jsonify({'Colaborador deletado com sucesso'})
        except Exception as e:
            return jsonify({'Não foi possível deletar o colaborador. Error: {}'.format(str(e))}), 405