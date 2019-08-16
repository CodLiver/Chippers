const util = require ("../config/util");
function uspass (username, password,email) {
    this.username = username;
    this.password = password;
    this.email = email;
    }

uspass.prototype= {
  getPassword:function (req,res,con,callback)  {
    let username=util.stringSanitizier(this.username);
      var sql="SELECT password FROM uspass WHERE username='"+username+"';";//select username?
      con.query(sql, function (err, resultINS) {
      console.log("my object: %o", resultINS[0].password)
        callback(resultINS[0].password);
      });
  },
  addUser:function (req,res,con,callback)  {
    let username=util.stringSanitizier(this.username);
    let pass=this.password;
    let email=this.email;
    if (!username) {
      console.log('boş gelmiş');
      callback(0);
    }
    pass=util.stringSanitizier(this.password);
    email=util.stringSanitizier(this.email);
    let sql="INSERT INTO uspass VALUES('"+username+"','"+pass+"','"+email+"');"
     con.query(sql, function (err, resultINS) {
        callback(resultINS);
      });
  },  isUser:function (req,res,con,callback)  {
    console.log('is user a geldi');
      let username=util.stringSanitizier(this.username);
      con.query("SELECT mail from uspass WHERE username='"+username+"';",
      function (error, results, fields) {
    		if (error) throw error;
        if (results[0]==null || username=='') {
        callback(0);
        }else {
        callback(1);  // var rows = JSON.parse(JSON.stringify(results[0]));
        }
  	});
    },
      isEmail:function (req,res,con,callback)  {
        let email=util.stringSanitizier(this.email);
          var sql="SELECT mail FROM uspass WHERE mail='"+email+"';";//select username?
          con.query(sql, function (err, results) {
            if (err) throw error;
            if (results[0]==null) {
            callback(0);
            }else {
            callback(1);  // var rows = JSON.parse(JSON.stringify(results[0]));
            }

          });
      },
  updatePassword: function(con,newPass,res,callback){
    let username=util.stringSanitizier(this.username);
    newPass=util.stringSanitizier(newPass);
    var sql="UPDATE uspass SET password='"+newPass+"' WHERE username='"+username+"' AND password='"+this.password+"' ;";
    con.query(sql,function (err, resultPass) {
    callback(resultPass);
    });
  }
}

//https://stackoverflow.com/questions/20534702/node-js-use-of-module-exports-as-a-constructor
module.exports = {
  uspass:uspass
};
