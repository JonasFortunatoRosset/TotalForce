from database.db import db

class Treino(db.Model):

    def to_dict(self):

        return{
            'codigo':        self.codigo,
            'nome':          self.nome,
            'descricao':     self.descricao,
            'cpfusuario':    self.cpfusuario,
            'cpfpropriedade':   self.cpfpropriedade,
            'codmodalidade': self.codmodalidade
        }
    
    codigo        = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    nome          = db.Column(db.String(100))
    descricao     = db.Column(db.String(100))
    cpfusuario    = db.Column(db.String(100))
    cpfpropriedade   = db.Column(db.String(100)) # Rever como irá funcionar
    codmodalidade = db.Column(db.Integer)


    def __init__(self,codigo,nome,descricao,cpfusuario,cpfpropriedade,codmodalidade):
        self.codigo        = codigo
        self.nome          = nome
        self.descricao     = descricao
        self.cpfusuario    = cpfusuario
        self.cpfpropriedade   = cpfpropriedade
        self.codmodalidade = codmodalidade