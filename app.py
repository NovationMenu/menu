from flask import Flask, render_template, request
# from model.categorie import Categorie
from controller.menuController import MenuController
# from model.article import Article
from model.db import db
import os


menucontroller = MenuController()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://root:root@localhost/restaurant')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'secretkey'
db.init_app(app)

@app.route("/")
def hello():
    return menucontroller.fetch_data()

@app.route("/table<int:id>/")
def table(id):
    return menucontroller.table_menu(id)

@app.route("/table<int:id>/ajoutcommande", methods=['GET'])
def ajoutcommande(id):
    args = request.args
    return menucontroller.ajouterCommande(id, args)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5001)