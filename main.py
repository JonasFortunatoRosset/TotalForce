from flask import Flask
from database.db import db
from routes.index import default_routes
from flask_cors import CORS

class App():
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.app.config['SQLALQUEMY_DATABASE_URI'] = 'mysql.pymysql://root:''@localhost/'
        self.app.config['SECRET_KEY']
        db.init_app(self.app)
        CORS(self.app)
        default_routes(self.app)

    def run(self):
        return self.app.run(port=3000, host='localhost', debug=True)
        
app = App()
app.run()