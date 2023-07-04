const mysql = require("mysql");

module.exports = function addCommentsAnswer(req, res) {
  let commentAnswer = req.body;
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
    let commentAnswerData = {
      parentCommentID: commentAnswer.parentCommentID,
      postID: commentAnswer.postID,
      name: commentAnswer.name,
      email: commentAnswer.email,
      text: commentAnswer.text,
      currentPostSlug: commentAnswer.currentPostSlug,
      commentTime: commentAnswer.commentTime,
    };
    let sqlCommentsAnswers = "INSERT INTO comments_answers SET ?";
    dbmysql.query(sqlCommentsAnswers, commentAnswerData, (err) => {
      if (err) {
        res.send({ err });
      } else {
        console.log(`Podkomentarz dodano pomyślnie.`);
        let sql = `SELECT * from comments_answers where postID = '${commentAnswer.postID}'`;
        dbmysql.query(sql, (err, results) => {
          if (err) {
            return err;
          }
          res.send({
            info: "Podkomentarz dodano pomyślnie",
          });
        });
      }
    });
  });
};

// Tworzenie nowej tabeli

// let sql =
// "CREATE TABLE comments_answers (id INT NOT NULL AUTO_INCREMENT, parentCommentID VARCHAR(255), postID VARCHAR(255), name VARCHAR(255), email VARCHAR(255), text VARCHAR(1000), currentPostSlug VARCHAR(255), commentTime VARCHAR(255), isCommentAnswerOn boolean NOT NULL, PRIMARY KEY (id))";
// dbmysql.query(sql, function (err, result) {
// if (err) throw err;
// console.log("Table created");
// });
