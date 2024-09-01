from usuarioRoute       import usuarios
from treinoRoute        import treinos
from modalidadeRoute    import modalidades
from exercicioRoute     import exercicios
from colaboradorRoute   import colaboradores
from administradorRoute import administradores

def default_routes(app):
    app.route(usuarios)
    app.route(treinos)
    app.route(modalidades)
    app.route(exercicios)
    app.route(colaboradores)
    app.route(administradores)