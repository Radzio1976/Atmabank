const  ObjectID = require('mongodb').ObjectId;

module.exports = async function removeComment(req, res, commentsdb) {
    await commentsdb.deleteOne({"_id": ObjectID(`${req.body.commentID}`)}, (error) => {
        if (error) {
            res.send({info: "Nie udało się usunąć komentarza", error})
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