from flask import request, jsonify
from models.treino import Treino
from models.modalidade import Modalidade
from models.exercicio import Exercicio

# Pesquisar pelo plano e depois treino

def pesquisarTreinoController():
    if request.method == 'GET':    
        try:
            # Pega do front o treino do usuário
            data = request.get_json()
            codigo_usuario = data['codigo'] 
            nome_treino = data['treino'] # peito, costa, perna etc...
            # Pequisa no back o treino do usuário
            treino = Treino.query.filter_by(codigo=codigo_usuario, nome=nome_treino).all()
            treinos_dict = {'Treinos': [treino.to_dict() for treino in treino]}
            codmodalidade = treino[0].codmodalidade = # Pega o código da modalidade, sendo que retorna apenas 1 treino
            # Pesquisa a modalidade filtrada pelo codmodalidade -> modalidade que o treino pertence
            modalidade = Modalidade.query.filter_by(codigo=codmodalidade).all()
            modalidades_dict = {'Modalidades': [modalidade.to_dict() for modalidade in modalidade]}
            # Pesquisa o exercício que pertence a modalidade /// FAZER AO CONTRARIO 
            exercicio = Exercicio.query.filter_by(codigo=codigo_usuario, codmodalidade=codmodalidade).all()
            exercicios_dict = {'Exercicios': [exercicio.to_dict() for exercicio in exercicio]}
            response = {
                'Treinos': treinos_dict,
                'Modalidades': modalidades_dict,
                'Exercicios': exercicios_dict
            }

            return jsonify(response), 200
        except Exception as e:
            return jsonify({'message': 'Não foi possível buscar treino. Error: {}'.format(str(e)), 500})
    