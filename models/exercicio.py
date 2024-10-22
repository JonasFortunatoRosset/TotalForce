from database.db import db

class Exercicio(db.Model):

    def to_dict(self):

        return{
            'codigo':        self.codigo,
            'nome':          self.nome,
            'descricao':     self.descricao,
            'gif':           self.gif,
            'repeticoes':    self.repeticoes,
            'serie':         self.serie,
            'codtreino':     self.codtreino,
            'codmodalidade': self.codmodalidade
        }
    
    codigo        = db.Column(db.Integer, primary_key=True, unique=True, nullable=True, autoincrement=True) 
    nome          = db.Column(db.String(100))
    descricao     = db.Column(db.String(100))
    video           = db.Column(db.String(512))
    repeticoes    = db.Column(db.Integer) #
    serie         = db.Column(db.Integer) #
    codtreino     = db.Column(db.Integer)



    def __init__(self,codigo,nome,descricao,video,repeticoes,serie,codtreino):
        self.codigo     = codigo
        self.nome       = nome
        self.descricao  = descricao
        self.video      = video
        self.repeticoes = repeticoes
        self.serie      = serie
        self.codtreino  = codtreino