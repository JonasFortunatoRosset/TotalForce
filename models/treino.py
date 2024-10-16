from database.db import db

class Treino(db.Model):

    def to_dict(self):

        return{
            'codigo':    self.codigo,
            'nome':      self.nome,
            'descricao': self.descricao,
            'codplano':  self.codplano,
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    nome      = db.Column(db.String(100))
    descricao = db.Column(db.String(100))
    codplano  = db.Column(db.Integer)


    def __init__(self,codigo,nome,descricao,codplano):
        self.codigo    = codigo
        self.nome      = nome
        self.descricao = descricao
        self.codplano  = codplano