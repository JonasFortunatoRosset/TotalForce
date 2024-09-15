from routes.usuarioRoute       import usuarios 
from routes.treinoRoute        import treinos
from routes.modalidadeRoute    import modalidades
from routes.exercicioRoute     import exercicios
from routes.colaboradorRoute   import colaboradores
from routes.administradorRoute import administradores

def default_routes(app):
    app.route(usuarios)
    app.route(treinos)
    app.route(modalidades)
    app.route(exercicios)
    app.route(colaboradores)
    app.route(administradores)
