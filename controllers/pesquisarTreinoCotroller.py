from flask import request, jsonify
from models.treino import Treino
from models.exercicio import Exercicio
from models.usuario import Usuario
from models.plano import Plano

# Pesquisar pelo plano e depois treino

def pesquisarTreinoController():
    if request.method == 'GET':    
        try:
            # Pega do front o treino do usuário
            codigo_usuario = request.args.get('codigo')
            # Pequisa no back o treino do usuário
            usuario = Usuario.query.filter_by(codigo=codigo_usuario)
            plano_usuario = usuario[0].codplano
            treino = Treino.query.filter_by(codplano=plano_usuario) # treinos
            treino1 = treino[0].codigo
            treino2 = treino[1].codigo
            treino3 = treino[2].codigo

            # Pega do banco os exercícios do treino 1
            exercicio1 = Exercicio.query.filter_by(codtreino=treino1)
            exercicio_treino_dict1 = [exercicio1.to_dict() for exercicio1 in exercicio1]

            # Pega do banco os exercícios do treino 2
            exercicio2 = Exercicio.query.filter_by(codtreino=treino2)
            exercicio_treino_dict2 = [exercicio2.to_dict() for exercicio2 in exercicio2]

            # Pega do banco os exercícios do treino 3
            exercicio3 = Exercicio.query.filter_by(codtreino=treino3)
            exercicio_treino_dict3 = [exercicio3.to_dict() for exercicio3 in exercicio3]
            data = Plano.query.all()
            plano_dict = [plano.to_dict() for plano in data]
            response = {
                'Plano_usuario': plano_usuario,
                'Plano': plano_dict,
                'Treino1': treino[0].nome,
                'Treino2': treino[1].nome,
                'Treino3': treino[2].nome,
                'Exercicio1': exercicio_treino_dict1,
                'Exercicio2': exercicio_treino_dict2,
                'Exercicio3': exercicio_treino_dict13

            }

            return jsonify(response), 200
        except Exception as e:
            return jsonify({'error': 'Não foi possível buscar treino. Error: {}'.format(str(e))}), 500
    