import re
from flask import render_template, request, flash
from model.categorie import Categorie
from model.article import Article
from model.commande import Commande
from model.detailscommande import DetailsCommande
from model.db import db
from itertools import groupby
from werkzeug.utils import redirect
from sqlalchemy import func, desc

class MenuController():
    
    def fetch_data(self):
        """Retourne la liste des catégories et des articles dans le template table.html

        Returns:
            render_template: Affiche la page table.html avec les catégories et les articles associés.
        """
        result_categorie = db.session.query(Categorie).filter(Categorie.visibilite==True).order_by(Categorie.position).all()
        data_article = db.session.query(Article, Categorie).filter(Categorie.visibilite==True, Article.visibilite==True).order_by(Categorie.position,Article.position).order_by(Categorie.position,Article.position).join(Article).all()
        # print(result_article)
        # for i in result_article:
        #     print(i.Article.nom, '   ', i.Article.description, '   ', i.Categorie.nom)
        lists = {}
        for k, g in groupby(data_article, key=lambda t: t['Categorie']):
            lists[k] = list(g)
            # print(lists)
        # for list_, items in lists.items():
        #     print(list_.nom)
        #     for item in items:
        #         print('    ', item[0].nom,'    ', item[0].description)
        return render_template("table.html", data= result_categorie, data2 = lists)
    
    def table_menu(self,id):
        commandeenattente = db.session.query(Commande).filter(Commande.status==0,Commande.numtable==id).all()
        print("commandeenattente")
        for i in commandeenattente:
            # message = "Merci votre commande n°"+ str(i.idcommande) +"a été prise en compte"
            flash("Merci ! Votre commande n° "+ str(i.idcommande) +" a été prise en compte", 'success')
            print (i.idcommande)
        commandeencours = db.session.query(Commande).filter(Commande.status==1,Commande.numtable==id).all()
        print("commandeencours")
        for j in commandeencours:
            flash("Votre commande n° "+ str(j.idcommande) +" est en cours de préparation", 'success')
            print (j.idcommande)
        result_categorie = db.session.query(Categorie).filter(Categorie.visibilite==True).order_by(Categorie.position).all()
        data_article = db.session.query(Article, Categorie).filter(Categorie.visibilite==True, Article.visibilite==True).order_by(Categorie.position,Article.position).join(Article).all()
        lists = {}
        for k, g in groupby(data_article, key=lambda t: t['Categorie']):
            lists[k] = list(g)
        return render_template("index.html", data= result_categorie, data2 = lists)
    
    def ajouterCommande(self, id, args):
        # for key in args:
        #     print(args[key])
        # print('taille')
        # print(len(args)) 
        # print('test')
        # for (k, v) in args.items():
        #     print("Key: " + k)
        #     print("Value: " + str(v))
        print(id)
        print('To_dict')
        # List = args.to_dict(flat=True)
        # for i in range(int(len(args.to_dict(flat=True))/2)):
        #     print(List.get('orders['+ str(i) +'][0]'), List.get('orders['+ str(i) +'][1]'))
        print('Fin_To_dict')
        # print(List.get('orders[0][0]'), List.get('orders[0][1]'))
        # print(args.to_dict(flat=True))
        # print(len(args.to_dict(flat=True)))
        commande = Commande(numtable=id, status='0', commentaire='')
        db.session.add(commande)
        db.session.commit()
        numcommande = db.session.query(Commande).filter_by(numtable=id).order_by(desc(Commande.idcommande)).first()
        print(numcommande.idcommande)
        List = args.to_dict(flat=True)
        for i in range(int(len(args.to_dict(flat=True))/2)):
            print(List.get('orders['+ str(i) +'][0]'), List.get('orders['+ str(i) +'][1]'))
            detailscommande = DetailsCommande(numcommande.idcommande, List.get('orders['+ str(i) +'][0]'), List.get('orders['+ str(i) +'][1]'))
            db.session.add(detailscommande)
            db.session.commit()
        return redirect("/table"+str(id))
        # return(request.url).replace("%5B", "[").replace("%5D", "]")
        # return(str(id))