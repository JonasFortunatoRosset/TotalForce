from database.db import db

class ResultadoUsuario(db.Model):
    __tablename__ = "registrotreino"

    def to_dict(self):
        
        return{
        'codigo':      self.codigo,
        'exercicio1':  self.exercicio1,
        'exercicio2':  self.exercicio2,
        'exercicio3':  self.exercicio3,
        'exercicio4':  self.exercicio4,
        'exercicio5':  self.exercicio5,
        'exercicio6':  self.exercicio6,
        'exercicio7':  self.exercicio7,
        'exercicio8':  self.exercicio8,
        'exercicio9':  self.exercicio9,
        'exercicio10': self.exercicio10,
        'exercicio11': self.exercicio11,
        'data'      :  self.data,
        'codtreino' :  self.codtreino,
        'codusuario':  self.codusuario
        }
    
    codigo      = db.Column(db.Integer, primary_key=True, nullable=True, unique=True, autoincrement=True)
    exercicio1  = db.Column(db.Float)
    exercicio2  = db.Column(db.Float)
    exercicio3  = db.Column(db.Float)
    exercicio4  = db.Column(db.Float)
    exercicio5  = db.Column(db.Float)
    exercicio6  = db.Column(db.Float)
    exercicio7  = db.Column(db.Float)
    exercicio8  = db.Column(db.Float)
    exercicio9  = db.Column(db.Float)
    exercicio10 = db.Column(db.Float)
    exercicio11 = db.Column(db.Float)
    data        = db.Column(db.String(12))
    codtreino   = db.Column(db.Integer) 
    codusuario  = db.Column(db.Integer)

    def __init__(self,exercicio1,exercicio2,exercicio3,exercicio4,exercicio5,exercicio6,exercicio7,exercicio8,exercicio9,exercicio10,exercicio11,data,codtreino,codusuario):
        self.exercicio1  = exercicio1
        self.exercicio2  = exercicio2
        self.exercicio3  = exercicio3
        self.exercicio4  = exercicio4
        self.exercicio5  = exercicio5
        self.exercicio6  = exercicio6
        self.exercicio7  = exercicio7
        self.exercicio8  = exercicio8
        self.exercicio9  = exercicio9
        self.exercicio10 = exercicio10
        self.exercicio11 = exercicio11
        self.data        = data
        self.codtreino   = codtreino
        self.codusuario  = codusuario