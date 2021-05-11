//test console.log("Hello")
//on importe la librairie fastify
import fastify from 'fastify'
import fastifyMongo from 'fastify-mongodb'
//on crée une application fastify en utilisant l'import de notre librairie ,
//  on config fastify pour afficher des logs
const app = fastify({ logger: true })
//on crée une route fastify sur l'url ou uri "/"
app.get('/', async () => {
    return { text: "Welcome sur cette Api qui liste des bookins!" }
})
// on connecte la bdd a mongo DB
app.register(fastifyMongo, {
    url: 'mongodb+srv://MyTodoApp:MyTodoApp@cluster0.obacx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
})

// création de la route qui retourne les bookins de MongoDB
app.get('/books', async () => {
    //mongo est une bdd qui contient la collection
    //collection correspond a une table d ela bdd

    const collection = app.mongo.db.collection('books')
    //sur coll° on peut utiliser +sieurs f° ici on veut recup TOUS les livres
    const books = await collection.find().toArray()
    // et on return les bookins de la bdd

    return books
})


//cette f° démarre notre serveur d'api
const start = async () => {
    console.log('serveur qui run..')
    await app.listen(3000)
    // ecoute sur le serveur 3000 toutes les rqtes
    console.log('le serveur est lançé! Vous pouvez visiter sur: http://localhost:3000')
}
// Et lancement fonction démarrage
start()
