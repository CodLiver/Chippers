const uspassCtrl = require("../controller/uspassController");
const usSessionCtrl = require("../controller/usersessionsController");

module.exports = {
viewUser: function(con,req,res){
uspassCtrl.viewUser(con,req,res);
},submitChangePassword: function(con,req,res){
  uspassCtrl.changePasswordPost(con,req,res);
},
registerUser: function(con,req,res){
  var uName=req.body.username;
  var pass=req.body.password;// dont forget to hash compare, check for sql injection, 20,50,limits.
  var email=req.body.email;
  var cAuth=req.cookies.auth_token;
  var cuName=req.cookies.username;
console.log('router for registerUser');
usSessionCtrl.deleteOldSessions(con);
usSessionCtrl.isCookie(req,res,function(boolean){
  console.log('boolean:'+boolean);
  if (boolean){
    res.status(400);
    res.send('Error 400');
  }else{
    uspassCtrl.isUser(con,req,res,function(resultqry){

      if (resultqry) {
        let errorMessage="user is already exisssssssssst";
          res.render( "registration",{"errorMessage":errorMessage});
      }else {
        console.log('not ok');
        res.status(400);
        res.send('Error 400');
      }


    })
                    // con.query("SELECT * FROM uspass WHERE username = '"+uName+"';", function (err, result) {
                    //
                    //   if (result.length>0){
                    //     res.render("/main");//username taken error. dont know how to say.
                    //   }else{
                    //
                    //     con.query("INSERT INTO uspass VALUES('"+uName+"','"+pass+"','"+email+"');", function (err, resultINSINS) {
                    //       res.redirect('/main');
                    //     });//con q insert
                    //
                    //   }//if username taken
                    // });//con q selall
  }//if has cookie
})
// uspassCtrl.isUser(con,req,res,function(result){
// console.log('routera döndü:'+result);
//
//
// });
}

}
