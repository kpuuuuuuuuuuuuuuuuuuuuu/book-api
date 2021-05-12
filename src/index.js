//test console.log("Hello")
//on importe la librairie fastify
import fastify from 'fastify'
import fastifyMongo from 'fastify-mongodb'
//on crée une application fastify en utilisant l'import de notre librairie ,
//  on config fastify pour afficher des logs
const app = fastify({ logger: true })
//on crée une route fastify sur l'url ou uri "/"
app.get('/', async () => {
    return { text: "Welcome: baby Api qui liste des bookins!" }
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
// On créé une route qui retourne qu'un livre par son
// identifiant
app.get('/books/:id', async (request) => {
    // On récupére l'identifiant rentré dans notre url
    const id = request.params.id

    // On récupére notre collection mongodb
    const collection = app.mongo.db.collection('books')
    // Ici on s'assure de ne pas avoir d'erreur
    try {
        // Nous récupérons le livre avec l'id spécifié dans la route
        // On vas chercher un seul livre par son ID
        //ds mongodb les id st cryptés par sécurité
        //on peut pas les return en string il faut les passer en ObjectId
        const book = await collection.findOne({ _id: new app.mongo.ObjectId(id) })

        // Si il n'y a pas de livre, nous levons une erreur
        if (!book) {
            throw new Error('This books does not exists')
        }

        // Si tout c'est bien passé, on retourne le livre
        return book
    } catch (error) {
        // Ici, si la moindre erreur est survenu à l'intérieur
        // du block try nous exécutons le code suivant:

        // On change le status code par 404 (Not Found)
        reply.status(404)

        // On retourne le message de l'erreur
        return { error: error.message }
    }


})

//Route ou endpoint pour MAJ un book avec rqt PATCH
app.patch('/books/:id', async (request) => {
    const id = request.params.id
    const updateFields = request.body

    const collection = app.mongo.db.collection('books')
    //il faut utiliser: await collection.updateOne({_id:new app.mongo.ObjectId(id)}, nouveauLivre)
    // on maj en spécifiant les fields
    await collection.updateOne(
        //ici on spécifie les queries à MAJ:
        { _id: new app.mongo.ObjectId(id) }
        //on spécifie les champs "$set"
        , { $set: updateFields },
    )


    // on recup le book maj dans la bdd

    const book = await collection.findOne({
        _id: new app.mongo.ObjectId(id),
    })


    //console.log(result)
    //ON GARDE LE STATUS CODE 200 pour le patch pas de message error
    // on retourne le book
    return book
})



//Route ou endpoint pour SUPPRIMER un book avec rqt DELETE

// Suppression d'un livre
app.delete('/books/:id', async (request) => {
    const id = request.params.id
    // Pour supprimer un livre avec MongoDB
    // il faut utiliser : await collection.deleteOne({ _id: new app.mongo.ObjectId(id) })
    const collection = app.mongo.db.collection('books')

    await collection.deleteOne({
        _id: new app.mongo.ObjectId(id)
    })

    reply.status(204)

    return null
})



//on déclare un shema qui permet d'ordonner (pour pas que ce soit modifier à l'input)
// pour contraindre l'ordre des données de la request POST /books
const createBookShema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        image: { type: 'string' },
        author: { type: 'string' },
        price: { type: 'number' },
        stars: { type: 'number' },
    },
    required: [
        'title',
        'description',
        'image',
        'author',
        'price',
        'stars'
    ]
}

//on crée une route pr créer un new book
//il faut respecter les conventions API REST
//api rest fonctionne ac les endpoints ou route ou uri ou url
app.post('/books', {// on attache le shema a la route
    schema: {
        body: createBookShema
    }
}, async (request) => {
    //on recup toutes les données du body (cf scr shot 22)
    //le livre=objet json dont les données affichées ds body
    const book = request.body
    //on insére ds la bdd (mongodb) j'ai besoin de la collection
    const collection = app.mongo.db.collection('books')
    //on enregistre le resultat ds bdd
    const result = await collection.insertOne(book)


    //a l'interieur du result:ttes les opé enregistrées 
    //comme on a inserer un seul elément avec insertOne
    // on a une seule valeur ds notre tableau
    reply.status(201)
    return result.ops[0]

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
