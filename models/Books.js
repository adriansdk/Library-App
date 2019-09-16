const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  image: String,
})

const Books = mongoose.model('Book', bookSchema)

module.exports = Books;