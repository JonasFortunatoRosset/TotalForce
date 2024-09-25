from database.db import db

class Login(db.Model):

    def to_dict(self):

        return{
            'token':      self.token,
            'chave_secreta': self.chave_secreta
        }


    token      = db.Column(db.String(512), primary_key=True, unique=True, nullable=True)
    chave_secreta = db.Column(db.String(100))


    def __init__(self,token,chave_secreta):
        self.token      = token
        self.chave_secreta = chave_secreta