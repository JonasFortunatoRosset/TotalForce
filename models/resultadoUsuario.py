from database.db import db

class ResultadoUsuario(db.Model):

    def to_dict(self):
        
        return{
        'codigo':     self.codigo,
        'exercicio1': self.exercicio1,
        'exercicio2': self.exercicio2,
        'exercicio3': self.exercicio3,
        'exercicio4': self.exercicio4,
        'exercicio5': self.exercicio5,
        'exercicio6': self.exercicio6,
        'exercicio7': self.exercicio7,
        'exercicio8': self.exercicio8,
        'exercicio9': self.exercicio9,
        'data'      : self.data,
        'codtreino' : self.codtreino,
        'codusuario': self.codusuario
        }
    
    codigo    = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    exercicio1 = db.Column(db.String(100))
    exercicio2 = db.Column(db.String(100))
    exercicio3 = db.Column(db.String(100))
    exercicio4 = db.Column(db.String(100))
    exercicio5 = db.Column(db.String(100))
    exercicio6 = db.Column(db.String(100))
    exercicio7 = db.Column(db.String(100))
    exercicio8 = db.Column(db.String(100))
    exercicio9 = db.Column(db.String(100))
    codtreino  = db.Column(db.Integer) 
    codusuario = db.Column(db.Integer)

    def __init__(self,exercicio1,exercicio2,exercicio3,exercicio4,exercicio5,exercicio6,exercicio7,exercicio8,exercicio9,data,codtreino,codusuario):
        self.exercicio1 = exercicio1
        self.exercicio2 = exercicio2
        self.exercicio3 = exercicio3
        self.exercicio4 = exercicio4
        self.exercicio5 = exercicio5
        self.exercicio6 = exercicio6
        self.exercicio7 = exercicio7
        self.exercicio8 = exercicio8
        self.exercicio9 = exercicio9
        self.data       = data
        self.codtreino  = codtreino
        self.codusuario = codusuario