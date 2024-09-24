from database.db import db

class Login(db.Model):

    def to_dict(self):

        return{
            'codigo':    self.codigo,
            'token':      self.token,
            'chave_secreta': self.chave_secreta
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, unique=True, nullable=True) 
    token      = db.Column(db.String(512))
    chave_secreta = db.Column(db.String(100))



    def __init__(self,codigo,token,chave_secreta):
        self.codigo    = codigo
        self.token      = token
        self.chave_secreta = chave_secreta