from flask import request, jsonify
from models.treino import Treino
from models.resultadoUsuario import ResultadoUsuario
from models.plano import Plano
from models.exercicio import Exercicio

def pesquisarResultadoUsuarioController():
    if request.method == 'POST':
        data = request.get_json()
        codigo_usuario = data['codusuario']
        codtreino = data['codtreino']
        print(codigo_usuario, codtreino)
        treino = Treino.query.get(codtreino)
        result_treino = ResultadoUsuario.query.filter_by(codusuario=codigo_usuario, codtreino=codtreino).all()
        exercicio = Exercicio.query.filter_by(codtreino=treino.codigo).all()
        
        result_treino_dict = {
            'ResultadoUsuario': [r.to_dict() for r in result_treino],
            'Exercicio': [e.nome for e in exercicio]  # Inclui apenas o nome dos exercícios
        }
        
        return jsonify(result_treino_dict), 200
