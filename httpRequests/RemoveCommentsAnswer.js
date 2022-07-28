const  ObjectID = require('mongodb').ObjectId;

module.exports = async function removeCommentsAnswer(req, res, commentsdb) {
    console.log(req.body);
    await commentsdb.updateOne({"_id": ObjectID(`${req.body.commentID}`)}, {$pull: {commentAnswers: {"_id": ObjectID(`${req.body.commentsAnswerID}`)}}}, (error) => {
        if (error) {
            res.send({info: "Nie udało się usunąć odpowiedzi na komentarz", error})
        } else {
            commentsdb.find({}).toArray((error, result) => {
                if (error) {
                    res.send({error});
                } else {
                    res.send({ info: "Wszystkie komentarze", comments: result });
                };
            });
        }
    });
};