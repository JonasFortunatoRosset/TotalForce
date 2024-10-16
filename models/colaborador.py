from database.db import db

class Colaborador(db.Model):

    def to_dict(self):

        return{
            'codigo':   self.codigo,
            'cpf':      self.cpf,
            'nome':     self.nome,
            'endereco': self.endereco,
            'senha':    self.senha,
            'status':   self.status
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    cpf       = db.Column(db.String(100))
    nome      = db.Column(db.String(100))
    endereco  = db.Column(db.String(100))
    senha     = db.Column(db.String(100))
    status    = db.Column(db.String(20))

    def __init__(self,cpf,nome,endereco,senha,status):
        self.cpf      = cpf
        self.nome     = nome
        self.endereco = endereco
        self.senha    = senha
        self.status   = status