from database.db import db # 130

class LoginUsuario(db.Model):

    def to_dict(self):

        return{
            'cpf':  self.cpf,
            'senha':  self.senha
        }
    
    cpf  = db.Column(db.String(100), primary_key=True, unique=True, nullable=True)
    senha  = db.Column(db.String(100))


    def __init__(self,cpf,senha):
        self.cpf  = cpf
        self.senha  = senha