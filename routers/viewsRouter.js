const postCtrl = require("../controller/postsController");
const usCtrl = require("../controller/usersessionsController");
const viewdir ="./view/";

module.exports = {
  main: function(req,res,con){
    usCtrl.isSession(req,res,con,
      function(resultBoolean){
          if(resultBoolean==1){
            res.sendFile("LoginInd.html", {root: viewdir});
          }else{
            let errorMessage="";
            let username='';
            res.render("noLoginIndex",{"errorMessage":errorMessage,"username":username});
          }
      });
  },
  getRegistration: function(req,res,con){
    var cAuth=req.cookies.auth_token;
    var cuName=req.cookies.username;
    console.log('registration');
    usCtrl.deleteOldSessions(con);

    usCtrl.isCookie(req,res,function(boolean){
      if (!boolean) {
        let errorMessage='please sign up';
        res.render('registration',{"errorMessage":errorMessage});
      }else {
        res.redirect('/main');
      }
    })
  },
  getChangePassword: function(req,res,con){
    usCtrl.isSession(req,res,con,
      function(resultBoolean){
          if(resultBoolean==1){
            console.log('çıktı');
               var name='';
               res.render( "passChange",{"name":name});
          }else{
             res.redirect('/main');
          }
      });
  }
}
