// login, register,/submit/changePassword and signout

const usCtrl = require("../controller/usersessionsController");
const viewdir ="./view/";
const usPassCtrl = require("../controller/uspassController");

module.exports = {
  signoutPost: function(req, res, con){
    usCtrl.signout(req,res,con);
  },
  login: function(req, res, con){
      usCtrl.isSession(req,res,con,function(resultSesh){
      if (resultSesh==1){
        res.redirect('/writer/'+req.body.username);
      }else{
        usPassCtrl.login(req,res,con);
      }
    });
  }
}
