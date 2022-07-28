const  ObjectID = require('mongodb').ObjectId;

module.exports = async function removeComment(req, res, commentsdb) {
    console.log(req.body);
    await commentsdb.deleteOne({"_id": ObjectID(`${req.body.commentID}`)}, (error) => {
        if (error) {
            res.send({info: "Nie udało się usunąć komentarza", error})
        } else {
            commentsdb.find({}).toArray((error, result) => {
                if (error) {
                    res.send({error});
                } else {
                    res.send({ info: "Komentarz dodano pomyślnie", comments: result });
                };
            });
        }
    });
};