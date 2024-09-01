from flask import request, jsonify
from database.db import db
from models.exercicio import Exercicio

def exercicioController():

    if request.method == 'POST':
        try:
            data = request.get_json()
            exercicio = Exercicio(codigo=data['codigo'],nome=data['nome'],descricao=['descricao'],codtreino=data['codtreino'])
            db.session.add(exercicio)
            db.session.commit()
            return ({'message': 'Exercio novo inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo exercício. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
        try:
            data = Exercicio.query.all()
            exercicios = {'Exercicio': [exercicio.to_dict() for exercicio in data]}
            return exercicios
        except Exception as e:
            return 'Não foi possível buscar usuários. Error: {}'.format(str(e)), 405
        
    elif request.method == 'PUT':
        try:
            data = request.get_json() 
            put_exercicio_id = data['codigo']
            put_exercicio = Exercicio.query.get(put_exercicio_id)
            if put_exercicio is None:
                return {'error': 'Exercicio não encontrado'}
            put_exercicio.nome = data.get('nome', put_exercicio.nome)
            put_exercicio.descricao = data.get('descricao', put_exercicio.descricao)
            put_exercicio.codtreino = data.get('codtreino', put_exercicio.codtreino)
            db.session.commit()
            return 'Colaborador alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar os dados do exercicio. Erro{}'.format(e)}, 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_exercicio = Exercicio.query.get(codigo)
            if delete_exercicio is None:
                return {'exercicio': 'exercicio inexistente'}, 404
            db.session.delete(delete_exercicio)
            db.session.commit()
            return 'Exercicio deletado com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o exercicio. Error: {}'.format(str(e)), 405