from flask import request
from models.treino import Treino

def pesquisarTreinoController():
    if request.method == 'GET':
        data = request.get_json()
        cpf_usuario = data['cpf']
    
    try:
        treino = Treino.query.filter_by(cpf=cpf_usuario).all()
        treinos_dict = {'Treinos': [treino.to_dict() for treino in treino]}
        return treinos_dict
    except Exception as e:
        return 'Não foi possível buscar treino. Error: {}'.format(str(e)), 405
    