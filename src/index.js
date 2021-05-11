//test console.log("Hello")
//on importe la librairie fastify
import fastify from 'fastify'
//on crée une application fastify en utilisant l'import de notre librairie ,
//  on config fastify pour afficher des logs
const app = fastify({ logger: true })
//on crée une route fastify sur l'url "/"
app.get('/', async () => {
    return { text: "Welcome sur cette api!" }
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
