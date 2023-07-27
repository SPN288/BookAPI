require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const database = require("./database/database");
const bookModal = require("./database/book");
const authorModal = require("./database/author");
const publicationModal = require("./database/publication");

const bodyParser = require("body-parser");

const booker = express();

booker.use(bodyParser.urlencoded({ extended: true }));
booker.use(bodyParser.json());


//connecting to mongodb
mongoose.connect(process.env.mongo_url).then(() => console.log("Connection is established"));


///////////////////////// GET METHODS ///////////////////////////////

//to get all the books
booker.get("/", async (req, res) => {
   const getallbooks = await bookModal.find();
   return res.json(getallbooks);
})

//to get all the publications
booker.get("/publication", async (req, res) => {
   const getallpublication = await publicationModal.find();
   return res.json(getallpublication);
})

/*
Route -                 /is
Description -           Get specific book on isbn
Access -                Public
Parameter -             isbn
Method -                get
*/

booker.get("/is/:isbn", async(req, res) => {
   const getspecificbook = await bookModal.findone(
      {isbn: req.params.isbn}
   );
   if (!getspecificbook) {
      return res.json({ error: `NO book found for the isbn of ${req.params.isbn}` });
   }
   return res.json(getspecificbook );
})

/*
Route -                 /ca
Description -           Get specific book on category
Access -                Public
Parameter -             category
Method -                get
*/

booker.get("/ca/:category", async(req, res) => {
   const getspecificbook = await bookModal.findone(
      {category: req.params.category}
   );
   if (!getspecificbook) {
      return res.json({ error: `NO book found for the category of ${req.params.category}` });
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
booker.get("/author", async (req, res) => {
   const getAllAuthors = await authorModal.find();
   return res.json(getAllAuthors)
});





/////////////////////// POST METHODS /////////////////////////

/*
Route -                 /book/new
Description -           to add new book
Access -                Public
Parameter -             none
Method -                post
*/

booker.post("/book/new",async (req, res) => {
   const {newbook} = req.body;
   const addNewBook =bookModal.create(newbook);
      return res.json({ updated: addNewBook,
                        message: "new book added ...." });
});

/*
Route -                 /author/new
Description -           to add new author
Access -                Public
Parameter -             none
Method -                post
*/

booker.post("/author/new", async (req, res) => {
   const {newauthor} = req.body;
   const addNewAuthor = await authorModal.create(newauthor);

   return res.json({ updated: addNewAuthor ,
                     message:"new author added to database" });
});



/////////////////// PUT ////////////////////////

/*
Route -                 /book/update/book
Description -           to update book
Access -                Public
Parameter -             isbn
Method -                put
*/
booker.put("book/update/:isbn", async(req,res)=>{
   const updatedBook = await bookModal.findOneAndUpdate(
      {isbn : req.params.isbn},
      {title: req.params.booktitle},
      {new: true}
   );
   return res.json({books:updatedBook});
 });
/*
Route -                 /book/author/update/book
Description -           to update/add new author
Access -                Public
Parameter -             isbn
Method -                put
*/

booker.put("book/author/update/:isbn",async(req,res)=>{
   //update book database
   const updatedBook = await bookModal.findOneAndUpdate(
      {isbn:req.params.isbn},
      {$addToSet:{author:req.body.newAuthor}},
      {new:true}
   );

   //update author database
   const updatedAuthor = await authorModal.findOneAndUpdate(
      {id:req.body.author},
      {$addToSet:{book:req.params.isbn}},
      {new:true}
   );
 return res.json({message:"updated"})
})

//////////////////// DELETE ////////////////////////


/*
Route -                 /book/delete
Description -           to delete book
Access -                Public
Parameter -             isbn
Method -                delete
*/
booker.delete("/book/delete/:isbn", async(req, res) => {
   const updatedbookdatabase = await bookModal.findOneAndDelete(
      { isbn: req.params.isbn}
   )
   return res.json({ books:updatedbookdatabase });
})


booker.listen(3000, () => console.log(`Server running at http://localhost:3000/`));