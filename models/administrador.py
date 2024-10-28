from database.db import db # 130

class Administrador(db.Model):

    def to_dict(self):

        return{
            'codigo': self.codigo,
            'nome':    self.nome,
            'cpf':   self.cpf,
            'login':  self.login,
            'senha':  self.senha
        }
    
    codigo = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    cpf    = db.Column(db.String(200))
    nome   = db.Column(db.String(100))
    login  = db.Column(db.String(100))
    senha  = db.Column(db.String(100))


    def __init__(self,cpf,nome,login,senha):
        self.cpf    = cpf
        self.nome   = nome
        self.login  = login
        self.senha  = senha