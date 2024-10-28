from database.db import db

class Usuario(db.Model):
    def to_dict(self):
    
        return{
            'codigo':   self.codigo,
            'nome':     self.nome,
            'endereco': self.endereco,
            'login':    self.login,
            'senha':    self.senha,
            'peso':     self.peso,
            'altura':   self.altura,
            'codplano': self.codplano,
            'status':   self.status,
        }

    codigo   = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    nome     = db.Column(db.String(100))
    endereco = db.Column(db.String(100))
    login    = db.Column(db.String(100))
    senha    = db.Column(db.String(200))
    peso     = db.Column(db.Float)
    altura   = db.Column(db.Integer)
    codplano = db.Column(db.Integer)
    status   = db.Column(db.String(20))


    def __init__(self,nome,endereco,login,senha,peso,altura,codplano,status):
        self.nome     = nome
        self.endereco = endereco
        self.login    = login
        self.senha    = senha
        self.peso     = peso
        self.altura   = altura
        self.codplano = codplano
        self.status   = status