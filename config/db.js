
var mysql = require('mysql');
module.exports = {
  getConnection: function () {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "(!Mu010595)",
      database: "Chippers"
    });

    return con;
  }
};
