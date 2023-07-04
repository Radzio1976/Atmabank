const mysql = require("mysql");

module.exports = function addComment(req, res) {
  const comment = req.body;
  const dbmysql = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  dbmysql.connect((err) => {
    if (err) {
      res.send({ info: "Nie udało się połączyć z bazą danych.", err });
    }
    console.log("Połączono z bazą danych dbmysql");
    let commentData = {
      postID: comment.postID,
      name: comment.name,
      email: comment.email,
      text: comment.text,
      currentPostSlug: comment.currentPostSlug,
      commentTime: comment.commentTime,
    };
    let sqlComments = "INSERT INTO comments SET ?";
    dbmysql.query(sqlComments, commentData, (err) => {
      if (err) {
        res.send({ err });
      } else {
        console.log(`Komentarz dodano pomyślnie.`);
        let sql = `SELECT * from comments where postID = '${comment.postID}'`;
        dbmysql.query(sql, (err, results) => {
          if (err) {
            return err;
          }
          res.send({ info: "Komentarz dodano pomyślnie" });
        });
      }
    });
  });
};
