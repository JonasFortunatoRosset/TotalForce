from flask import Flask
from database.db import db
from routes.index import default_routes
from flask_cors import CORS

class App():
    def __init__(self) -> None:
        self.app = Flask(__name__)
        