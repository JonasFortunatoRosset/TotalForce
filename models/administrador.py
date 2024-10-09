from database.db import db # 130

class Administrador(db.Model):
    __tablename__ = 'administrador'

    def to_dict(self):

        return{
            'codigo': self.codigo,
            'cpf':    self.cpf,
            'nome':   self.nome,
            'senha':  self.senha
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    cpf = db.Column(db.String(150))
    nome   = db.Column(db.String(100))
    senha  = db.Column(db.String(100))


    def __init__(self,cpf,nome,senha):
        self.cpf    = cpf
        self.nome   = nome
        self.senha  = senha