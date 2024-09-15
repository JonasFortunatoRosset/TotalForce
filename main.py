from flask import Flask
from database.db import db
from routes.index import default_routes
from flask_cors import CORS
import secrets

class App():
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:J010406%40@localhost/totalforce'
        self.app.config['SECRET_KEY'] = secrets.token_hex(32)
        db.init_app(self.app)
        CORS(self.app)
        default_routes(self.app)

    def run(self):
        return self.app.run(port=3000, host='localhost', debug=True)

app = App()
app.run()