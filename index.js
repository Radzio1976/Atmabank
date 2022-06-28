const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require("path");
const  ObjectID = require('mongodb').ObjectId;
const {MongoClient} = require('mongodb');
require("dotenv/config");
const PORT = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  //app.use((req, res, next) => {
  //  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  //  res.header("Access-Control-Allow-Origin", "*");
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //  next();
  //});
  app.use(express.static("client/build"));
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
  })
}

const client = new MongoClient(uri);


app.post("/getComments", (req, res) => {
  //res.send({mongodb_uri: uri})
  async function main() {
  try {
      // Connect to the MongoDB cluster
    await client.connect();
    await getComments(client);
  } catch (error) {
    console.log("Nie udało się uzyskać połączenia z bazą danych", error);
  }
}
main();

  async function getComments(client) {
    const result = await client.db("atma_bank").collection("comments").find({}).toArray();
    if (result) {
      res.send({ info: "Wszystkie komentarze", comments: result });
    } else {
        res.send(error);
    }
  }
})


app.get("/addComment", (req, res) => {
  async function main() {
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      await addComment(client, req, res);
    }  catch (error) {
      console.log("Nie udało się uzyskać połączenia z bazą danych", error);
    }
  }
  main();

  async function addComment(client, req, res) {
    const comment = req.body;
    await client.db("atma_bank").collection("comments").insertOne({
      postID: comment.postID,
      name: comment.name,
      email: comment.email,
      text: comment.text,
      currentPostSlug: comment.currentPostSlug,
      commentTime: comment.commentTime,
      isCommentAnswerOn: comment.isCommentAnswerOn,
      commentAnswers: comment.commentAnswers
    }, (error) => {
      if (error) {
        console.log("Nie udało się dodać komentarza", error)
      } else {
        client.db("atma_bank").collection("comments").find({}).toArray((error, result) => {
          if (error) {
            res.send({error})
          } else {
            res.send({ info: "Wszystkie komentarze", comments: result })
          }
        });
    }
    })
  }
})


app.post("/addCommentsAnswer", (req, res) => {
  async function main() {
    try {
      await client.connect();
      await addCommentsAnswer(client, req, res);
    }  catch (error) {
      console.log("Nie udało się uzyskać połączenia z bazą danych", error);
    }
  }
  main();

  async function addCommentsAnswer(client, req, res) {
    let commentAnswer = req.body;
    commentAnswer._id = new ObjectID();  
    await client.db("atma_bank").collection("comments").updateOne({_id: new ObjectID(commentAnswer.parentCommentID)}, { $addToSet: { commentAnswers: commentAnswer }}, (error, result) => {
      if (error) {
        console.log("Nie udało się dodać odpowiedzi na komentarz")
      } else {
        client.db("atma_bank").collection("comments").find({}).toArray((error, result) => {
          if (error) {
            res.send({error})
          } else {
            res.send({ info: "Wszystkie komentarze", comments: result })
          }
        });
      }
    })
    }
  });

  
  /*
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  */

  //app.use("/", (req, res) => {
  //  console.log("Welcome to Atma bank");
  //})
  
app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
    
})