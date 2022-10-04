const mongoose = require('mongoose');
const Scheme = mongoose.Schema //Objeto en que defines modelo de entidad

const Movie = new Schema( //Solo aceptar entries que sigan esta estructura
    {
    name: {type: String, required: true},
    time: {type: [String], required: true},
    rating: {rating: Number, required: true},
    },
    { timestamps: true } //Hora en que se editó por última vez una cosa
)
module.exports=mongoose.model('movies', Movie);