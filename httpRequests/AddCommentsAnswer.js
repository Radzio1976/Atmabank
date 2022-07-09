const  ObjectID = require('mongodb').ObjectId;

module.exports = async function addCommentsAnswer(req, res, db) {
    let commentAnswer = req.body;
    commentAnswer._id = new ObjectID();  
    await db.updateOne({_id: new ObjectID(commentAnswer.parentCommentID)}, { $addToSet: { commentAnswers: commentAnswer }}, (error, result) => {
      if (error) {
        res.send({info: "Nie udało się dodać odpowiedzi na komentarz", error});
      } else {
        db.find({}).toArray((error, result) => {
          if (error) {
            res.send({error});
          } else {
            res.send({ info: "Odpowiedź na komentarz dodano pomyślnie", comments: result });
          };
        });
      };
    });
  };