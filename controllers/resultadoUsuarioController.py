from flask import request, jsonify
from database.db import db
from models.resultadoUsuario import ResultadoUsuario

def resultadoUsuarioController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            resultado_usuario = ResultadoUsuario(exercicio1=data['exercicio1'],exercicio2=data['exercicio2'],exercicio3=data['exercicio3'],exercicio4=data['exercicio4'],exercicio5=data['exercicio5'],exercicio6=data['exercicio6'],exercicio7=data['exercicio7'],exercicio8=data['exercicio8'],exercicio9=data['exercicio9'],data=data['data'],codtreino=data['codtreino'],codusuario=data['codusuario'])
            db.session.add(resultado_usuario)
            db.session.commit()
            return jsonify({'message': 'Resultado do treino cadastrado com sucesso'}),200
        except Exception as e:
            return jsonify({'error': 'Erro ao inserir novo resultado de treino. Erro: {}'.format(str(e))}), 400
    elif request.method == 'GET':
        try:
            data = ResultadoUsuario.query.all()
            resultadousuarios = {'ResultadoUsuario' : [resultadousuario.to_dict() for resultadousuario in data]}
            return resultadousuarios
        except Exception as e:
                return 'Não foi possível buscar o resultado do treino. Error: {}'.format(str(e)), 405
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_resultado_usuario_codigo = data['codigo']
            put_resultado_usuario = ResultadoUsuario.query.get(put_resultado_usuario_codigo)
            if put_resultado_usuario is None:
                return jsonify({'error': 'Treino não encontrado'}), 404
            put_resultado_usuario.exercicio1 = data.get('exercicio1', put_resultado_usuario.exercicio1)
            put_resultado_usuario.exercicio2 = data.get('exercicio2', put_resultado_usuario.exercicio2)
            put_resultado_usuario.exercicio3 = data.get('exercicio3', put_resultado_usuario.exercicio3)
            put_resultado_usuario.exercicio4 = data.get('exercicio4', put_resultado_usuario.exercicio4)
            put_resultado_usuario.exercicio5 = data.get('exercicio5', put_resultado_usuario.exercicio5)
            put_resultado_usuario.exercicio6 = data.get('exercicio6', put_resultado_usuario.exercicio6)
            put_resultado_usuario.exercicio7 = data.get('exercicio7', put_resultado_usuario.exercicio7)
            put_resultado_usuario.exercicio8 = data.get('exercicio8', put_resultado_usuario.exercicio8)
            put_resultado_usuario.exercicio9 = data.get('exercicio9', put_resultado_usuario.exercicio9)
            put_resultado_usuario.data       = data.get('data'      , put_resultado_usuario.data)
            put_resultado_usuario.codtreino  = data.get('codtreino' , put_resultado_usuario.codtreino)
            put_resultado_usuario.codusuario = data.get('codusuario', put_resultado_usuario.codusuario)
            db.session.commit()
            return jsonify({'message': 'Resultado do treino alterado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao alterar resultado do treino: {str(e)}'}), 400
    
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_resultado_treino = ResultadoUsuario.query.get(codigo)
            if delete_resultado_treino is None:
                return jsonify({'error': 'Resultado de treino inexistente'}), 404
            db.session.delete(delete_resultado_treino)
            db.session.commit()
            return jsonify({'message': 'Resultado do treino deletado com sucesso'})
        except Exception as e:
            return jsonify({'Não foi possível deletar o resultado do treino. Error: {}'.format(str(e))}), 405