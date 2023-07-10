const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");
const booker = express();
booker.use(bodyParser.urlencoded({ extended: true }));
booker.use(bodyParser.json());

///////////////////////// GET METHODS ///////////////////////////////

//to get all the books
booker.get("/", (req, res) => {
   return res.json({ data: database });
})

/*
Route -                 /is
Description -           Get specific book on isbn
Access -                Public
Parameter -             isbn
Method -                get
*/

booker.get("/is/:isbn", (req, res) => {
   const getspecificbook = database.books.filter(
      (book) => book.ISBN === req.params.isbn
   );
   if (getspecificbook.length === 0) {
      return res.json({ error: `NO book found for the isbn of ${req.params.isbn}` });
   }
   return res.json({ book: getspecificbook });
})

/*
Route -                 /ca
Description -           Get specific book on category
Access -                Public
Parameter -             category
Method -                get
*/

booker.get("/ca/:category", (req, res) => {
   const getspecificbook = database.books.filter(
      (book) => book.category.includes(req.params.category)
   );
   if (getspecificbook.length === 0) {
      return res.json({ error: `NO book found for the category of ${req.params.category}` });
   }
   return res.json({ book: getspecificbook });
})

/*
Route -                 /la
Description -           Get specific book on languages
Access -                Public
Parameter -             language
Method -                get
*/

booker.get("/la/:language", (req, res) => {
   const getspecificbook = database.books.filter(
      (book) => book.language === req.params.language
   );
   if (getspecificbook.length === 0) {
      return res.json({ error: `NO book found for the language of ${req.params.language}` });
   }
   return res.json({ book: getspecificbook });
})

/*
Route -                 /author
Description -           Get specific book on author
Access -                Public
Parameter -             none
Method -                get
*/
booker.get("/author", ((req, res) => {
   return res.json({ data: database.author })
}))




/*
Route -                 /
Description -           Get list of books of an specific author
Access -                Public
Parameter -             author
Method -                get
*/
booker.get("/:authorname", (req, res) => {
   const getspecificauthor = database.author.filter(
      (author) => author.name === req.params.authorname
   )
   return res.json({ books: getspecificauthor })

})

/////////////////////// POST METHODS /////////////////////////

/*
Route -                 /book/new
Description -           to add new book
Access -                Public
Parameter -             none
Method -                post
*/

booker.post("/book/new", (req, res) => {
   const newbook = req.body;
   database.books.push(newbook);
   return res.json({ updated: database.books });
});

/*
Route -                 /author/new
Description -           to add new author
Access -                Public
Parameter -             none
Method -                post
*/

booker.post("/author/new", (req, res) => {
   const newAuthor = req.body;
   database.author.push(newAuthor);
   return res.json({ updated: database.author });
});

/*
Route -                 /pub/new
Description -           to add new publication
Access -                Public
Parameter -             none
Method -                post
*/

booker.post("/pub/new", (req, res) => {
   const newPublication = req.body;
   database.publications.push(newPublication);
   return res.json({ updated: database.publications });
});

/////////////////// PUT ////////////////////////

/*
Route -                 /pubblication/update/book
Description -           to update/add new publication
Access -                Public
Parameter -             isbn
Method -                put
*/

booker.put("/publication/update/book/:isbn", (req, res) => {
   database.publications.forEach((pub) => {
      if (pub.id === req.body.id) {
         return pub.book.push(req.params.isbn);
      }
   })

   database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
         book.publications = req.body.publications;
         return;
      }
   })

   return res.json({
      books: database.books,
      publications: database.publications,
      message: "Successfully updated Publications"
   })
})


//////////////////// DELETE ////////////////////////


/*
Route -                 /book/delete
Description -           to delete book
Access -                Public
Parameter -             isbn
Method -                delete
*/
booker.delete("/book/delete/:isbn", (req, res) => {
   const updatedbookdatabase = database.books.filter(
      (book) => book.ISBN !== res.params.isbn)
   database.books = updatedbookdatabase;
   return res.json({ books: database.books });
})

/*
Route -                 /book/delete/author
Description -           to delete an author from a book and vice versa
Access -                Public
Parameter -             isbn,author
Method -                delete
*/
booker.delete("/book/delete/author/:isbn/:id", (req, res) => {
   database.books.forEach((book) => {
      if (book.isbn === req.params.isbn) {
         const newAuthorList = book.author.filter((eachAuthor) =>
            eachAuthor !== parseInt(req.params.id));
         book.author = newAuthorList;
         return;
      }
   });

   database.author.forEach(
      (eachAuthor) => {
         if (eachAuthor.id === parseInt(req.params.id)) {
            const newBookList = eachAuthor.books.filter((book) =>
               book !== req.params.isbn);
            eachAuthor.books = newBookList;
            return;
         };
      }
   )
      return res.json({
         book: database.books,
         author : database.author,
         message :"author deleted",
      });

})

booker.listen(3000, () => console.log(`Server running at http://localhost:3000/`));