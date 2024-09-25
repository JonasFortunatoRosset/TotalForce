from database.db import db

class Exercicio(db.Model):

    def to_dict(self):

        return{
            'codigo':    self.codigo,
            'nome':      self.nome,
            'descricao': self.descricao,
            'gif': self.gif,
            'codtreino': self.codtreino
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, unique=True, nullable=True) 
    nome      = db.Column(db.String(100))
    descricao = db.Column(db.String(100))
    gif       = db.Column(db.String(512))
    codtreino = db.Column(db.Integer)



    def __init__(self,codigo,nome,descricao,gif,codtreino):
        self.codigo    = codigo
        self.nome      = nome
        self.descricao = descricao
        self.gif = gif
        self.codtreino = codtreino