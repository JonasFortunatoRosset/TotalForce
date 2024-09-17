from routes.usuarioRoute       import usuarios 
from routes.treinoRoute        import treinos
from routes.modalidadeRoute    import modalidades
from routes.exercicioRoute     import exercicios
from routes.colaboradorRoute   import colaboradores
from routes.administradorRoute import administradores

def default_routes(app):
    usuarios(app)
    treinos(app)
    modalidades(app)
    exercicios(app)
    colaboradores(app)
    administradores(app)
