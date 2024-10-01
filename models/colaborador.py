from database.db import db

class Colaborador(db.Model):

    def to_dict(self):

        return{
            'cpf':      self.cpf,
            'nome':     self.nome,
            'endereco': self.endereco,
            'senha':    self.senha
        }
    
    
    cpf      = db.Column(db.String(100), primary_key=True,nullable=True,unique=True)
    nome     = db.Column(db.String(100))
    endereco = db.Column(db.String(100))
    senha    = db.Column(db.String(100))


    def __init__(self,cpf,nome,endereco,cidade,senha):
        self.cpf      = cpf
        self.nome     = nome
        self.endereco = endereco
        self.senha    = senha