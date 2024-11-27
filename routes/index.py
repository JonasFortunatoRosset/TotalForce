from routes.usuarioRoute       import usuarios 
from routes.treinoRoute        import treinos
from routes.exercicioRoute     import exercicios
from routes.colaboradorRoute   import colaboradores
from routes.administradorRoute import administradores
from routes.loginUsuarioRoute import loginusuarios
from routes.loginAdministradorRoute import loginadministradores
from routes.loginColaboradorRoute import logincolaboradores
from routes.loginAdministradorRoute import loginadministradores
from routes.loginColaboradorRoute import logincolaboradores
from routes.pesquisartreinos import pesquisartreinos
from routes.validarTokenRoute import validartokens
from routes.invalidartoken import invalidartokens
from routes.planoRoute   import planos
from routes.resultadoUsuarioRoute import resultadoUsuarios
from routes.pesquisarcodplanousuarioRoute import pesquisarCodplanoUsuarios
from routes.getTreinoRoute import getTreinos
from routes.pesquisarResultadoUsuarioRoute import pesquisarResultadoUsuario

def default_routes(app):
    usuarios(app)
    treinos(app)
    exercicios(app)
    colaboradores(app)
    administradores(app)
    loginusuarios(app)
    loginadministradores(app)
    logincolaboradores(app)
    pesquisartreinos(app)
    validartokens(app)
    invalidartokens(app)
    planos(app)
    resultadoUsuarios(app)
    pesquisarCodplanoUsuarios(app)
    getTreinos(app)
    pesquisarResultadoUsuario(app)