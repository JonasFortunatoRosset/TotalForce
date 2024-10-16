from database.db import db

class Modalidade(db.Model):
    __tablename__ = 'plano'

    def to_dict(self):
        
        return{
        'codigo':       self.nome,
        'nome':         self.nome,
        'codmodalidade' self.codmodalidade
        }
    
    codigo        = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    nome          = db.Column(db.String(50))
    codmodalidade = db.Column(db.Integer)

    def __init__(self,nome,codmodalidade):
        self.nome      = nome
        self.codmodalidade = codmodalidade