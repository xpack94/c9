--creation  de toutes les tables



DROP TABLE Vetement;
DROP TABLE notifications;	
DROP TABLE favoris; 
DROP TABLE alimentation;
DROP TABLE Véhicule;
DROP TABLE meuble;
DROP TABLE objet;
DROP SEQUENCE id_objet_seq;
DROP TABLE categories;
DROP SEQUENCE id_categories_seq;
DROP TABLE membre;
DROP SEQUENCE id_membre_seq;

set DATESTYLE=dmy;

CREATE TABLE membre 
	(id_membre INT NOT NULL  ,
	nom_membre VARCHAR(55) NOT NULL ,
	prenom VARCHAR(55) NOT NULL,
	addr VARCHAR(255) NOT NULL,
	cité VARCHAR(30) NOT NULL ,
	codePostal VARCHAR(30) NOT NULL,
	email VARCHAR(100) NOT NULL ,
	username VARCHAR(100) NOT NULL ,
	motDePass VARCHAR(100) NOT NULL,
	telNo VARCHAR(30)  ,
	CONSTRAINT membrePk PRIMARY KEY(id_membre)
	);
CREATE SEQUENCE id_membre_seq;
ALTER TABLE membre ALTER id_membre SET DEFAULT NEXTVAL('id_membre_seq');



CREATE TABLE categories 
		(id_catégorie INT NOT NULL,
		 Nom_cat VARCHAR(50) NOT NULL,
		 description_cat VARCHAR(255),
		 CONSTRAINT categoriePk PRIMARY KEY(id_catégorie)
		);
CREATE SEQUENCE id_categories_seq;
ALTER TABLE categories ALTER id_catégorie SET DEFAULT NEXTVAL('id_categories_seq');



CREATE TABLE objet
		(id_objet INT NOT NULL ,
		nom_objet VARCHAR(30) NOT NULL,
		prix NUMERIC ,
		date_fin DATE,
		id_annonceur INT NOT NULL ,
		date_annonce DATE NOT NULL ,
		id_achteur INT,
		date_achat DATE,
		id_categorie INT NOT NULL,
 		CONSTRAINT objetPk PRIMARY KEY(id_objet),
 		CONSTRAINT objetFk1 FOREIGN KEY(id_annonceur) REFERENCES membre(id_membre) on delete cascade   on update cascade,
		CONSTRAINT objetFk2 FOREIGN KEY(id_achteur) REFERENCES membre(id_membre) on delete cascade   on update cascade,
		CONSTRAINT objetFk3 FOREIGN KEY(id_categorie) REFERENCES categories(id_catégorie) on delete cascade   on update cascade
		);
CREATE SEQUENCE id_objet_seq;
ALTER TABLE objet ALTER id_objet SET DEFAULT NEXTVAL('id_objet_seq');
 



CREATE TABLE Vetement 
		(id_objet INT NOT NULL  ,
		 grandeur NUMERIC NOT NULL ,
		 matériel VARCHAR(50),
		 type VARCHAR(50),
		 style VARCHAR(50),
		 description_vetement VARCHAR(50),
		 CONSTRAINT vetementFk FOREIGN KEY(id_objet) REFERENCES objet(id_objet) on delete cascade on update cascade 
		 );
CREATE TABLE Alimentation 
			(id_objet INT NOT NULL,
			 genre VARCHAR(50),
			 date_péremption VARCHAR(50),
			 quantité NUMERIC,
			 origine VARCHAR(50),
			 CONSTRAINT alimentationFk FOREIGN KEY(id_objet) REFERENCES objet(id_objet) on delete cascade on update cascade 
			);


CREATE TABLE meuble 
		( id_objet INT NOT NULL,
		 état VARCHAR(50),
		 genre VARCHAR(50),
		 matériel VARCHAR(50),
		 description_meuble VARCHAR(255),
		 CONSTRAINT meubleFk FOREIGN KEY(id_objet) REFERENCES objet(id_objet) on delete cascade on update cascade 
		 );

CREATE TABLE Véhicule 
		(id_objet  INT NOT NULL ,
		 marque VARCHAR(50) NOT NULL,
		 année DATE NOT NULL,
		 kilometrage INT NOT NULL,
		 couleur VARCHAR(30) NOT NULL,
		 description_vehicule VARCHAR(255),
		 CONSTRAINT VéhiculeFk FOREIGN KEY(id_objet) REFERENCES objet(id_objet) on delete cascade on update cascade 
		 );

CREATE TABLE favoris 
		(id_membre INT NOT NULL ,
		 id_cate INT NOT NULL ,
		 CONSTRAINT favorisFk1 FOREIGN KEY(id_membre) REFERENCES membre(id_membre) on delete cascade   on update cascade,
		 CONSTRAINT favorisFk2 FOREIGN KEY(id_cate) REFERENCES categories(id_catégorie) on delete cascade   on update cascade
		 );

CREATE TABLE notifications
		 (id_notif INT NOT NULL ,
		  date DATE NOT NULL,
		  id_membre INT NOT NULL,
		  id_objet INT NOT NULL,
		  CONSTRAINT notifFk1 FOREIGN KEY(id_membre) REFERENCES membre(id_membre) on delete cascade   on update cascade,
		  CONSTRAINT notifFk2 FOREIGN KEY(id_objet) REFERENCES objet(id_objet) on delete cascade   on update cascade 
		  );