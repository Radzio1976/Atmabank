module.exports = async function addComment(req, res, db) {
    const comment = req.body;
    await db.insertOne({
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
        res.send({info: "Nie udało się dodać komentarza", error});
      } else {
            db.find({}).toArray((error, result) => {
                if (error) {
                    res.send({error});
                } else {
                    res.send({ info: "Komentarz dodano pomyślnie", comments: result });
                };
            });
        };
    });
  };