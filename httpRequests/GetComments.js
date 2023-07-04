const mysql = require("mysql");

module.exports = function getComments(res) {
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

    let sqlComments = "SELECT * FROM comments";
    dbmysql.query(sqlComments, (err, results) => {
      if (err) throw error;
      let comments = results;

      let sqlCommentsAnswers = "SELECT * FROM comments_answers";
      dbmysql.query(sqlCommentsAnswers, (err, results) => {
        if (err) throw error;

        let commentsAnswers = results;
        comments.forEach((comment) => {
          comment.commentAnswers = [];
        });
        for (let i = 0; i < comments.length; i++) {
          for (let j = 0; j < commentsAnswers.length; j++) {
            if (comments[i].id === Number(commentsAnswers[j].parentCommentID)) {
              comments[i].commentAnswers.push(commentsAnswers[j]);
            }
          }
        }
        res.send({ info: "Wszystkie komentarze", comments });
      });
    });
  });
};
