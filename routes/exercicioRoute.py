from controllers.exercicioController import exercicioController

def exercicios(app):
    app.route('/exercicios', methods=['POST','GET','PUT','DELETE'])(exercicioController)