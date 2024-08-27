from database.db import db # 130

class Administrador(db.Model):

    def to_dict(self):

        return{
            'codigo': self.codigo,
            'nome':   self.nome,
            'cpf':    self.cpf,
            'login':  self.login,
            'senha':  self.senha
        }
    

    codigo = db.Column(db.Integer, primary_key=True,nullable=True,unique=True)
    nome   = db.Column(db.String(100))
    cpf    = db.Column(db.Integer)
    login  = db.Column(db.String(100))
    senha  = db.Column(db.String(100))


    def __init__(self,codigo,nome,cpf,login,senha):
        self.codigo = codigo
        self.nome   = nome
        self.cpf    = cpf
        self.login  = login
        self.senha  = senha