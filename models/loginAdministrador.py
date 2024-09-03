from database.db import db # 130

class LoginAdministrador(db.Model):

    def to_dict(self):

        return{
            'login':  self.login,
            'senha':  self.senha
        }
    
    login  = db.Column(db.String(100))
    senha  = db.Column(db.String(100))


    def __init__(self,login,senha):
        self.login  = login
        self.senha  = senha