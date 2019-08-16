const rand = require("randomstring");
function UserSession (username, endDate, randSecure) {
    this.username = username;
    this.endDate = endDate;
    this.randSecure = randSecure;
}

UserSession.prototype= {
  addCookie:function (con,uName,randNum,callback)  {
    con.query("INSERT INTO usersessions VALUES('"+uName+"',(NOW() + INTERVAL 2 HOUR),'"+randNum+"');", function (err, resultINS) {
      callback(uName);
    });//con q insert
  },
  isSession: function(con,cuName,cAuth,callback){
    con.query("SELECT * FROM usersessions WHERE username = '"+cuName+"' AND randSecure = '"+cAuth+"';", function (err, resultSELALL) {
      if (err) throw new Error(err)
      callback(resultSELALL.length);
    });
  },
  deleteCookie:function(con,cuName,callback){
    con.query("DELETE FROM usersessions WHERE username='"+cuName+"';", function (err, resultDEL) {
      callback();
    });
  }
}

//https://stackoverflow.com/questions/20534702/node-js-use-of-module-exports-as-a-constructor
module.exports = {
  deleteOldSessions: function(con){
    con.query("DELETE FROM usersessions WHERE enddate<NOW();", function (err, resultDEL) {});
  },
  UserSession:UserSession
};
