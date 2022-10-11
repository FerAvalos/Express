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

//Create
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

//READ
app.get('/get-movie/:id', async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
    try {
        const {params:{id}}=req 
        console.log('id', id)
        const doc = db.collection('movies').doc(id)
        const {_fieldsProto} = await doc.get()
        res.send({
            status: 200,
            time: _fieldsProto.time.stringValue,
            author: _fieldsProto.author.stringValue,
            name: _fieldsProto.name.stringValue,
            rating: _fieldsProto.rating.stringValue
        })
    } catch(error) {
        res.send(error)
    }
})

//DELETE
app.delete('/delete-movie/:id', async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
    try {
        const {params: {id}} = req
        const movieDB = db.collection('movies').doc(id)
        await movieDB.delete()
        res.send({
            status: 200
        })
    } catch(error) {
        res.send(error)
    }
})

//UPDATE
app.put('/update-movie/', async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
    try {
        const {body: movie} = req
        const { time, author, name, rating} = movie
        const movieDB = db.collection('movies').doc(id)
        const resp = await movieDB.update({
            name,
            time,
            rating,
            author
        })
        res.send({
            status: 200,
            id,
        })
    } catch(error) {
        res.send(error)
    }
})

//Get-movies
app.get('/get-movies', async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
    try {
        const moviesDB = await db.collection('movies').get()
        const resp=moviesDB.docs.map(doc=>doc.data())
        res.send({
            resp
        })
    } catch(error) {
        res.send(error)
    }
})


app.listen(apiPort, ()=> console.log(`Server running on port ${apiPort}`)); //Cuando acabe de levantarse la aplicación se quede dormida hasta request