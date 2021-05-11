Api qui liste es livres 
de book-native-api
API Restfull d'une librairie (pour le fun)
Les exercices
Exo 1 - Mettre en place un README.md
Cloner ce projet dans le répertoire de votre choix
Ouvrir le projet avec vscode
Créer un fichier README.md (avec vscode) et placez une courte description du projet
Dans un terminal (vscode) faire un commit
Faire un « push » sur github
Envoyer le lien du projet github sur le chat
Exo 2 - Mettre en place un package.json
Lancer la commande npm init
Renseigner dans "entry point" le chemin src/index.js
Ajouter la ligne "type": "module", après la clefs main dans le package.json
Faire un commit et pousser sur github
Exo 3 - Lancer un script js avec nodejs
Créer le fichier src/index.js avec un console.log
Ajouter un script dans package.json avec la configuration suivante:
"scripts": {
    "start": "node src/index.js"
}
Vous pouvez tester en lancant la commande yarn start ou bien npm start
Faire un commit et "push" sur github
Exo 4 - Installer Fastify
On lance l'installation de fastify avec la commande yarn add fastify (vous pouvez vérifier l'installation en regardant votre package.json)
On ignore le versionning du répertoire node_modules:
créé un fichier .gitignore à la racine du projet
Ajouter la ligne node_modules dans le fichier .gitignore
On commit et push sur github
Exo 5 - Un server fastify
Dans src/index.js ajouter le code permettant de démarer un server sur le port 3000
Vous pouvez lancer la commander yarn start pour tester votre server (vous pouvez appuyer sur Ctrl-C afin de quitter le server)
On commit et on push
Exo 6 - afficher un text de bienvenue sur la route "/"
Dans src/index.js ajouter une route get avec le chemin / et retourner un objet json de votre choix
Vous pouvez tester en demarant votre server (si dèja lancé vous pouvez l'arréter avec la touche Ctrl-C dans votre terminal, pour lancer le server faire yarn start).
On commit et on push

pr installer une bdd mongoDB https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ mais on va utiliser celle de David
Exo 7 - Installer fastify mongodb extension
Installer la paquet: fastify-mongodb avec la commande yarn add fastify-mongodb
Configurer fastify mongo dans le fichier index.js (Vous pouvez utiliser l'url: mongodb+srv://MyTodoApp:MyTodoApp@cluster0.obacx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority)
Vous pouvez tester en lancant votre server (faire Ctrl-C si le server est dèja lancé, pour lancer le server la commande est yarn start)
On commit et on push sur github
