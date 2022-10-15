const express = require('express') //El objeto que manda la librería de express guárdalo en express

const {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    getMovies
} = require('../controllers')

const router = express.Router()

router.post('/create-movie', createMovie)
router.get('/get-movie/:id', getMovie)
router.delete('/delete-movie/:id', deleteMovie)
router.put('/update-movie/', updateMovie)
router.get('/get-movies', getMovies)

module.exports={
    router
}

