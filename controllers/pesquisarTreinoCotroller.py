from flask import request, jsonify
from models.treino import Treino
from models.exercicio import Exercicio
from models.usuario import Usuario

# Pesquisar pelo plano e depois treino

def pesquisarTreinoController():
    if request.method == 'GET':    
        try:
            # Pega do front o treino do usuário
            data = request.get_json()
            codigo_usuario = data['codigo'] 
            # Pequisa no back o treino do usuário
            usuario = Usuario.query.filter_by(codigo=codigo_usuario).all()
            plano_usuario = usuario[0].plano
            treino = Treino.query.filter_by(codplano=plano_usuario).all() # treinos
            treino1 = treino[0].codigo
            # Pega do banco os exercícios de cada treino
            exercicio = Exercicio.query.filter_by(codtreino=treino1).all()
            exercicio_treino_dict = {'Exercicios': [exercicio.to_dict() for exercicio in exercicio]}
            response = {
                'Treinos': treino,
                'Plano': plano_dict,
                'Exercicios': exercicio_treino_dict,
            }

            return jsonify(response), 200
        except Exception as e:
            return jsonify({'error': 'Não foi possível buscar treino. Error: {}'.format(str(e))}), 500
    