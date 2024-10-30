from flask import request, jsonify
from usuario import Usuario
from treino import Treino
from resultadoUsuario import ResultadoUsuario
from plano import Plano

def pesquisarResultadoUsuarioController():
    if request.method == 'POST':
        codigo_usuario = request.args.get('codigo')
        codplano_usuario = request.args.get('codplano')
        usuario = Usuario.query.filter_by(codigo=codigo_usuario)
        codplano_usuario = usuario[0].plano
        treino = Treino.query.filter_by(codplano=codplano_usuario)
        treino1 = treino[0].codigo
        treino2 = treino[1].codigo
        treino3 = treino[2].codigo
        # Pega os resultados dos treinos
        # Código plano é um parâmetro que o usuário seta para ver evolução de treinos mais antigos sem dar conflito
        result_treino1 = ResultadoUsuario.query.filter_by(codusuario=codigo_usuario, codtreino=treino1, codplano=codplano_usuario)
        result_treino2 = ResultadoUsuario.query.filter_by(codusuario=codigo_usuario, codtreino=treino2, codplano=codplano_usuario)
        result_treino3 = ResultadoUsuario.query.filter_by(codusuario=codigo_usuario, codtreino=treino3, codplano=codplano_usuario)
        result_treino1_dict = {'ResultadoUsuario1' : [result_treino1.to_dict() for result_treino1 in data]}
        result_treino2_dict = {'ResultadoUsuario2' : [result_treino2.to_dict() for result_treino2 in data]}
        result_treino3_dict = {'ResultadoUsuario3' : [result_treino3.to_dict() for result_treino3 in data]}
        response = {result_treino1_dict, result_treino2_dict, result_treino3_dict}
        return jsonify(response), 200