//test console.log("Hello")
//on importe la librairie fastify
import fastify from 'fastify'
//on crée une application fastify en utilisant l'import de notre librairie ,
//  on config fastify pour afficher des logs
const app = fastify({ logger: true })
//cette f° démarre notre serveur d'api
const start = async () => {
    console.log('serveur qui run..')
    await app.listen(3000)
    console.log('le serveur est lançé!  vous pouvez visiter sur: http://localhost:3000')
}
//lancement fonction démarrage
start()
