from routes.usuarioRoute       import usuarios 
from routes.treinoRoute        import treinos
from routes.modalidadeRoute    import modalidades
from routes.exercicioRoute     import exercicios
from routes.colaboradorRoute   import colaboradores
from routes.administradorRoute import administradores
from routes.loginUsuarioRoute import loginusuarios
from routes.loginAdministradorRoute import loginadministradores
from routes.loginColaboradorRoute import logincolaboradores
from routes.loginAdministradorRoute import loginadministradores
from routes.loginColaboradorRoute import logincolaboradores

def default_routes(app):
    usuarios(app)
    treinos(app)
    modalidades(app)
    exercicios(app)
    colaboradores(app)
    administradores(app)
    loginusuarios(app)
    loginadministradores(app)
    logincolaboradores(app)