module.exports = async function sendLoginData(req, res, usersdb) {
    const data = req.body;
    
    const result = await usersdb.find({login: data.login, password: data.password}).toArray();
    if (result.length === 1) {
      res.send({ 
        info: "Znaleziono użytkownika", 
        isAuthFirstStep: true, 
        ascii: result[0].ascii, 
        name: result[0].name,
        type: result[0].type 
      });
    } else {
      res.send({ 
        info: "Nie znaleziono użytkownika", 
        isAuthFirstStep: false, ascii: "" 
      });
    }
  };