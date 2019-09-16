const express = require('express');
const router  = express.Router();

const Book = require('../models/Books')

/* GET home page */
router.get('/books', (req, res, next) => {
  Book.find().then((allTheBooks) => {
    res.render('book-views/books-list', {books : allTheBooks})
  })
  .catch((err) =>{
    next(err)
  })
});

router.get('/books/details/:theid', (req,res,next) => {
  let id = req.params.theid
  Book.findById(id)
  .then ((bookObject) =>{
    res.render ('book-views/details', {theBook: bookObject})
  })
})


router.get('/books/create-new-book', (req,res,next) =>{
  res.render('book-views/new-book');
})

router.post('/books/creation', (req,res,next)=>{

  let title = req.body.theTitle;
  let author = req.body.theAuthor;
  let image = req.body.image;

  Book.create({
    title: title,
    author: author,
    image: image,
  })
  .then((result)=>{
    //it's literally taking us to localhost:3000/books
    res.redirect('/books')
  })

})

router.post('/books/delete/:id', (req,res,next) =>{
  let id = req.params.id

  Book.findByIdAndRemove(id)
  .then((result) =>{
    res.redirect('/books')
  })
  .catch((err) =>{
    next(err)
  })
})

router.get('/books/editbook/:id', (req,res,next) =>{
  let id = req.params.id;

  Book.findById(id)
  .then((theBook) =>{
    res.render('book-views/edit', {book: theBook,})
  })
  .catch((err)=>{
    next(err)
  })
})

router.post('/books/update/:id', (req,res,next) =>{
  let id = req.params.id;

  Book.findByIdAndUpdate(id, {
    title: req.body.theTitle,
    author: req.body.theAuthor,
    image: req.body.image,
  })
  .then((result) =>{
    res.redirect('/books/details/'+id)
  })
  .catch((err) =>{
    next(err);
  })
})


module.exports = router;
