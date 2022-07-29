const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");
const {MongoClient} = require('mongodb');
require("dotenv/config");
const uri = process.env.MONGODB_URI;

const sendLoginData = require('./httpRequests/SendLoginData');
const sendGoogleToken = require('./httpRequests/SendGoogleToken');
const getComments = require('./httpRequests/GetComments');
const addComment = require('./httpRequests/AddComment');
const addCommentsAnswer = require('./httpRequests/AddCommentsAnswer');
const removeComment = require('./httpRequests/RemoveComment');
const removeCommentsAnswer = require('./httpRequests/removeCommentsAnswer');
const sendContactForm = require('./httpRequests/SendContactForm');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/api", (req, res) => {
  res.send("test");
})

app.use(express.static(path.join(__dirname, './client/build')));

app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"),
    function (err) {
      if (err) {
        res.status(500), send(err);
      };
    }
  );
});

const client = new MongoClient(uri);

async function mongoDBConnection() {
  try {
    //Connect to the MongoDB cluster
    client.connect();
    console.log("Connected with MongoDB");
    } catch (error) {
    console.log("Not connected with MongoDB", error);
  }
}
mongoDBConnection();

const usersdb = client.db("atma_bank").collection("users");
const commentsdb = client.db("atma_bank").collection("comments");

app.post("/sendLoginData", (req, res) => {
  sendLoginData(req, res, usersdb);
})

app.post("/sendGoogleToken", (req, res) => {
  sendGoogleToken(req, res);
})

app.post("/getComments", (req, res) => {
  getComments(req, res, commentsdb);
});

app.post("/addComment", (req, res) => {
  addComment(req, res, commentsdb);
});


app.post("/addCommentsAnswer", (req, res) => {
  addCommentsAnswer(req, res, commentsdb);
});

app.post("/removeComment", (req, res) => {
  removeComment(req, res, commentsdb);
});

app.post("/removeCommentsAnswer", (req, res) => {
  removeCommentsAnswer(req, res, commentsdb);
});

app.post("/sendContactForm", (req, res) => {
  sendContactForm(req, res);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
});