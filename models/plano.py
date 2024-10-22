from database.db import db

class Plano(db.Model):
    __tablename__ = 'plano'

    def to_dict(self):
        
        return{
        'codigo':       self.nome,
        'nome':         self.nome,
        }
    
    codigo        = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    nome          = db.Column(db.String(100))

    def __init__(self,nome):
        self.nome = nome