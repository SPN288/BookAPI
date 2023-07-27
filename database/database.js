const books= [
    {ISBN:"1234book",
     title: "tesla",
     language: "en",
     numpage: 300,
     author:[1,2],
     publications:[1],
     category:["tech","space","education"]
    },
    {ISBN:"4440",
     title: "champak",
     language: "hindi",
     numpage: 40,
     author:[1],
     publications:[1],
     category:["stoty","cartoon"]
    }
]

const author= [
    {
        id:1,
        name:"satya",
        books:["1234book","siary"]
    },
    {
        id:2,
        name:"elonmusk",
        books:["1234book"]
    }
]

const publications =[
    {
        pubid:1,
        name:"writex",
        book:["1234book"]
    }
]

module.exports={books,author,publications};