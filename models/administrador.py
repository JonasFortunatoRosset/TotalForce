from database.db import db # 130

class Administrador(db.Model):

    def to_dict(self):

        return{
            'cpf':    self.cpf,
            'nome':   self.nome,
            'senha':  self.senha
        }
    

    cpf = db.Column(db.String(100), primary_key=True,nullable=True,unique=True)
    nome   = db.Column(db.String(100))
    senha  = db.Column(db.String(100))


    def __init__(self,cpf,nome,senha):
        self.cpf    = cpf
        self.nome   = nome
        self.senha  = senha