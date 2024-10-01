from flask import request, jsonify
from database.db import db
from models.treino import Treino


def treinoController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            treino = Treino(codigo=data['codigo'],nome=data['nome'],descricao=data['descricao'],codusuario=data['codusuario'],propriedade=data['propriedade'],codmodalidade=data['codmodalidade'])
            db.session.add(treino)
            db.session.commit()
            return jsonify({'message': 'Treino cadastrado com sucesso'}),200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo treino. Erro: {}'.format(str(e))}), 400
    
    elif request.method == 'GET':
        try:
            data = Treino.query.all()
            treinos = {'Treino' : [treino.to_dict() for treino in data]}
            return treinos
        except Exception as e:
                return 'Não foi possível buscar treino. Error: {}'.format(str(e)), 405
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            print(data)
            put_treino_id = data['codigo']
            put_treino = Treino.query.get(put_treino_id)
            if put_treino is None:
                return jsonify({'error': 'Treino não encontrado'}), 404
            put_treino.nome          = data.get('nome', put_treino.nome)
            put_treino.descricao     = data.get('descricao', put_treino.descricao)
            put_treino.codusuario    = data.get('cpfusuario', put_treino.codusuario)
            put_treino.propriedade   = data.get('cpfpropriedade', put_treino.cpfpropriedade)
            put_treino.codmodalidade = data.get('codmodalidade', put_treino.codmodalidade)
            db.session.commit()
            return jsonify({'message': 'Treino alterado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao alterar treino: {str(e)}'}), 400
    
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_treino = Treino.query.get(codigo)
            if delete_treino is None:
                return {'error': 'Treino inexistente'}, 404
            db.session.delete(delete_treino)
            db.session.commit()
            return 'Treino deletado com sucesso'
        except Exception as e:
            return 'Não foi possível deletar o treino. Error: {}'.format(str(e)), 405