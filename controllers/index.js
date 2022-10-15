const FS = require('../firebase')
const {db}=FS

const createMovie = async(req, res)=>{
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
}

const getMovie = async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
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
}

const updateMovie = async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
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
}

const deleteMovie = async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
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
}

const getMovies = async (req, res) => { //A todo lo que llegue a get movie lo vas a mandar aquí y lo que llegue después se guarda en id
    try {
        const moviesDB = await db.collection('movies').get()
        const resp=moviesDB.docs.map(doc=>doc.data())
        res.send({
            resp
        })
    } catch(error) {
        res.send(error)
    }
}

module.exports = {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    getMovies
}