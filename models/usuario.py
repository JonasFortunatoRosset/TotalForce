from database.db import db

class Usuario(db.Model):
    def to_dict(self):
    
        return{
            'codigo':   self.codigo,
            'nome':     self.nome,
            'cpf':      self.cpf,
            'endereco': self.endereco,
            'cidade':   self.cidade,
            'senha':    self.senha,
            'peso':     self.peso,
            'altura':   self.altura
        }

    codigo   = db.Column(db.Integer, primary_key=True, nullable=True, unique=True)
    nome     = db.Column(db.String(100))
    cpf      = db.Column(db.Integer)
    endereco = db.Column(db.String(100))
    cidade   = db.Column(db.String(100))
    senha    = db.Column(db.String(100))
    peso     = db.Column(db.Float)
    altura   = db.Column(db.Integer)


    def __init__(self, codigo,nome,cpf,endereco,cidade,senha,peso,altura):
        self.codigo   = codigo
        self.nome     = nome
        self.cpf      = cpf
        self.endereco = endereco
        self.cidade   = cidade
        self.senha    = senha
        self.peso     = peso
        self.altura   = altura