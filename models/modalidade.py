from database.db import db

class Modalidade(db.Model):
    __tablename__ = 'modalidade'

    def to_dict(self):
        
        return{
        'nome':   self.nome,
        'descricao': self.descricao
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    nome      = db.Column(db.String(100))
    descricao = db.Column(db.String(100))

    def __init__(self,nome,descricao):
        self.nome      = nome
        self.descricao = descricao