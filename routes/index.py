from usuarioRoute       import usuarios 
from treinoRoute        import treinos
from modalidadeRoute    import modalidades
from exercicioRoute     import exercicios
from colaboradorRoute   import colaboradores
from administradorRoute import administradores
from loginUsuarioRoute import loginUsuario

def default_routes(app):
    app.route(usuarios)
    app.route(treinos)
    app.route(modalidades)
    app.route(exercicios)
    app.route(colaboradores)
    app.route(administradores)
    app.route(loginUsuario)