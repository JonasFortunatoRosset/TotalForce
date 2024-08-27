from database.db import db

class Modalidade(db.Model):

    def to_dict(self):
        
        return{
        'codigo': self.codigo,
        'nome':   self.nome,
        'descricao': self.descricao
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    nome      = db.Column(db.String(100))
    descricao = db.Column(db.String(100))

    def __init__(self,codigo,nome,descricao):
        self.codigo    = codigo
        self.nome      = nome
        self.descricao = descricao