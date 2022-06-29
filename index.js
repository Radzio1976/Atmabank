const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require("path");
const  ObjectID = require('mongodb').ObjectId;
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
require("dotenv/config");
const uri = process.env.MONGODB_URI;

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/api/", (req, res) => {
  res.send("test");
})

app.use(express.static(path.join(__dirname, './client/build')));

app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"),
  function (err) {
    if (err) {
      res.status(500), send(err);
    }
  }
  )
})

const client = new MongoClient(uri);

async function mongoDBConnection() {
  try {
       //Connect to the MongoDB cluster
    client.connect();
  } catch (error) {
    console.log("Nie udało się uzyskać połączenia z bazą danych", error);
  }
}
mongoDBConnection();


app.post("/getComments", async (req, res) => {
    const result = await client.db("atma_bank").collection("comments").find({}).toArray();
    if (result) {
      res.send({ info: "Wszystkie komentarze", comments: result });
    } else {
        res.send(error);
    }
})


app.post("/addComment", async (req, res) => {
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
})


app.post("/addCommentsAnswer", async (req, res) => {
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
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }
  /*
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  */
  
  

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
    
})

/*
db.alphabet.updateOne(
   { _id: 1 },
   { $addToSet: { letters: [ "c", "d" ] } }
)
*/