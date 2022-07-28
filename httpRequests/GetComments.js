module.exports = async function getComments(req, res, commentsdb) {
    const result = await commentsdb.find({}).toArray();
    if (result) {
      res.send({ info: "Wszystkie komentarze", comments: result });
    } else {
        res.send(error);
    };
  };