module.exports = async function getComments(req, res, db) {
    const result = await db.find({}).toArray();
    if (result) {
      res.send({ info: "Wszystkie komentarze", comments: result });
    } else {
        res.send(error);
    };
  };