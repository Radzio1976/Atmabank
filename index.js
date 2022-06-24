const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require("path")
require("dotenv/config");


const app=express();

app.use(express.static(path.join(__dirname, './client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbname = 'atma-bank';

mongoClient.connect(url, {}, (error, client) => {
  if (error) {
    console.log("Nie można połączyć się z bazą danych")
  } else {
    const db = client.db(dbname);

    app.post("/addComment", (req, res) => {
      const comment = req.body;

      db.collection("comments").insertOne({
        postID: comment.postID,
        name: comment.name,
        email: comment.email,
        text: comment.text,
        currentPostSlug: comment.currentPostSlug,
        commentTime: comment.commentTime,
        isCommentAnswerOn: comment.isCommentAnswerOn,
        commentAnswers: comment.commentAnswers
      }, (error, result) => {
        if (error) {
          console.log("Nie udało się dodać komentarza", error)
        } else {
          db.collection("comments").find({}).toArray((error, results) => {
            if (error) {s
              console.log(error)
            } else {
              res.send({ info: "Komentarz dodano pomyślnie", comments: results });
              console.log(result.ops)
            }
          });

        }
      })
  });

  app.post("/getComments", (req, res) => {
    db.collection("comments").find({}).toArray((error, results) => {
      if (error) {
        console.log(error)
      } else {
        res.send({ info: "Wszystkie komentarze", comments: results });
      }
    })
  })



  }
})









  

  //app.use((req, res, next) => {
  //  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  //});

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
    
})