from database.db import db

class Treino(db.Model):

    def to_dict(self):

        return{
            'codigo':        self.codigo,
            'nome':          self.nome,
            'descricao':     self.descricao,
            'codusuario':    self.codusuario,
            'propriedade':   self.propriedade,
            'codmodalidade': self.codmodalidade
        }
    
    codigo        = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    nome          = db.Column(db.String(100))
    descricao     = db.Column(db.String(100))
    codusuario    = db.Column(db.Integer)
    propriedade   = db.Column(db.String) # Rever como irá funcionar
    codmodalidade = db.Column(db.Integer)


    def __init__(self,codigo,nome,descricao,codusuario,propriedade,codmodalidade):
        self.codigo        = codigo
        self.nome          = nome
        self.descricao     = descricao
        self.codusuario    = codusuario
        self.propriedade   = propriedade
        self.codmodalidade = codmodalidade