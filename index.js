const express = require('express') //El objeto que manda la librería de express guárdalo en express
const bodyParser = require('body-parser') //Definir como vamos a mandar el cuerpo
const cors = require('cors'); 
const { use } = require('express/lib/application');
var firebase = require("firebase-admin");

var serviceAccount = require("./key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

const db=firebase.firestore()
const moviesDB=db.collection('movies')

const app = express(); //Crear aplicación express
const apiPort = 3003;

app.use(bodyParser.urlencoded({extended: true})); //Mandar urlencoded, checa que único que esté leyendo es contentType que estamos mandando
app.use(cors()); //No nos explote aplicación si hay 2 hosts en diferentes puertos
app.use(bodyParser.json()) //Lo que mandamos en body se interpreta con json

app.get('/', (req, res) => ( //Cuando algo llegue responder hello world
    res.send('Hello World')
));

app.post('/create',async(req, res)=>{
    try {
        const {body:movie}=req //Alias al body llamada movie
        const moviesDb = db.collection('movies')
        const {_path: {segments}}= await moviesDB.add(movie) //Asigna el id automaticamente
        const id=segments[1]//Mandar como respuesta de mi api
        res.send({
            status:200,
            id
        })
    } catch(error){
        res.send(error)
    }
})

app.listen(apiPort, ()=> console.log(`Server running on port ${apiPort}`)); //Cuando acabe de levantarse la aplicación se quede dormida hasta request