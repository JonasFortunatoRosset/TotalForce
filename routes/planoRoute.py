from controllers.planoController import planoController

def planos(app):
    app.route('/planos', methods=['POST','GET','PUT','DELETE'])(planoController)