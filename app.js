const express = require('express')
const app = express()
var path = require("path");
const bodyParser= require('body-parser')
const port = 8080

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));




  const { MongoClient } = require("mongodb");
  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = "mongodb+srv://admin:admin@cluster0.yy3fm.mongodb.net/<dbname>?retryWrites=true&w=majority";
 

  async function run(termek,osszeg,tipus) {
    const client = new MongoClient(uri, { useUnifiedTopology: true  });
    try {
      await client.connect();
      const database = client.db("DATABASE_EXPENSE");
      const collection = database.collection("expenses");
      // create a document to be inserted
      const doc = { Termek: termek, Osszeg: osszeg ,Type:tipus,Datum: new Date().toString()};
      const result = await collection.insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );      
    }
    catch(err){}

 finally {
     // await client.close();
    }
  }
 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/quotes', (req, res) => {
  
  console.log(req.body.termek)
  console.log(req.body.osszeg)
  
 // client.db.collection.insertOne
  run(req.body.termek,req.body.osszeg,req.body.tipus).catch(console.dir).then(result => {
    res.redirect('/')
  });
  
})

