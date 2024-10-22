from flask import request, jsonify
from models.treino import Treino
from models.modalidade import Modalidade
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
            plano_usuario = usuario[[0]].plano
            treino = Treino.query.filter_by(codplano=plano_usuario).all() # treinos
            treino1 = treino[0].codigo
            treino2 = treino[1].codigo
            treino3 = treino[2].codigo
            # Pega do banco os exercícios de cada treino
            exercicio1 = Exercicio.query.filter_by(codtreino=treino1).all()
            exercicio2 = Exercicio.query.filter_by(codtreino=treino2).all()
            exercicio3 = Exercicio.query.filter_by(codtreino=treino3).all()
            #
            exercicio_treino1_dict = {'Exercicios1': [exercicio1.to_dict() for exercicio1 in exercicio1]}
            exercicio_treino2_dict = {'Exercicios2': [exercicio2.to_dict() for exercicio2 in exercicio2]}
            exercicio_treino3_dict = {'Exercicios3': [exercicio3.to_dict() for exercicio3 in exercicio3]}
            response = {
                'Treinos': treinos_dict,
                'Plano': plano_dict,
                'Exercicios1': exercicio_treino1_dict,
                'Exercicios2': exercicio_treino2_dict,
                'Exercicios3': exercicio_treino3_dict,
            }

            return jsonify(response), 200
        except Exception as e:
            return jsonify({'error': 'Não foi possível buscar treino. Error: {}'.format(str(e))}), 500
    