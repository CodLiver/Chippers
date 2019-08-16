const rand = require("randomstring");
const userSessionsEntity = require("../model/usersessions");

module.exports = {
  deleteOldSessions: function (con) {
    userSessionsEntity.deleteOldSessions(con);
  },
  signout:function(req,res,con){
    var cAuth=req.cookies.auth_token;
    var cuName=req.cookies.username;
    module.exports.deleteOldSessions(con);//old sessions are deleted, but can be kept for track reasons.
    //this initial query is made, because one simply can change their cookie to the other and delete someone else's session with that. but cAuth prevents due to uniqueness issue
    module.exports.isSession(req,res,con,function(result){
      if (result>0) {
        userSessionsViewEntity=new userSessionsEntity.UserSession(cuName,"",cAuth);
        userSessionsViewEntity.deleteCookie(con,userSessionsViewEntity.username,
          function(){res.clearCookie("username");res.clearCookie("auth_token");res.redirect("/main");})
        }else{
          res.status(400);
          res.send('Error 400');
        }
    })

  },
  addcookie: function(res,con,uName){
    var randNum=rand.generate(32);
    const d = new Date();
    userSessionsViewEntity=new userSessionsEntity.UserSession(uName,d.getTime()+120*60000,randNum);
    userSessionsViewEntity.addCookie(con,userSessionsViewEntity.username,userSessionsViewEntity.randSecure,
      function(){
        res.cookie('username',userSessionsViewEntity.username, { maxAge: 120*60000, httpOnly: false });
        res.cookie('auth_token',userSessionsViewEntity.randSecure, { maxAge: 120*60000, httpOnly: true })
        res.redirect('/writer/'+userSessionsViewEntity.username);
      })
  },
  isSession: function(req,res,con,callback){
    let cAuth=req.cookies.auth_token;
    let cuName=req.cookies.username;
    if (req.cookies.auth_token==null || req.cookies.username==null) {
      callback(0);
    } else {
      userSessionsViewEntity=new userSessionsEntity.UserSession(cuName,"",cAuth);
      userSessionsViewEntity.isSession(con,cuName,cAuth,callback);
    }

  },
  isCookie: function(req,res,callback){
    let cAuth=req.cookies.auth_token;
    let cuName=req.cookies.username;
      if (typeof cAuth != 'undefined' && typeof cuName != 'undefined'){
        callback(true);
      }  else {
          callback(false);
      }
  }
};
