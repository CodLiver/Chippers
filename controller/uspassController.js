  const uspassEntity = require("../model/uspass");
  const usCtrl = require ("../controller/usersessionsController");
  const util = require ("../config/util");
  module.exports ={

  login: function (req,res,con){
  var uName=req.body.username;
  let pass=req.body.password;// dont forget to hash compare
  uspassLoginEntity=new uspassEntity.uspass(uName,pass,'');
  uspassLoginEntity.isUser(req,res,con,function(result){
    if (result==0) {
      console.log('username or password is wrong');
      let  errorMessage="username or password is wrongggggggggggg";
      let username=req.body.username;
    res.render('noLoginIndex.ejs', {"errorMessage":errorMessage,"username":username})
  } else {


    uspassLoginEntity.getPassword(req,res,con,
      function(resultPass){
        let userpass=util.stringSanitizier(resultPass);
           pass=util.stringSanitizier(pass);
        if (userpass==pass) {
          usCtrl.addcookie(res,con,uName);
          console.log('password is valid');
            // res.render('/main');
            errorMessage="password is true";
            // res.redirect('/writer/'+uName);
        } else {
            console.log('username or password is wrong');
       errorMessage="username or password is wrong";
        username=req.body.username;
     // res.render('noLoginIndex.ejs', {"errorMessage":errorMessage,"username":username})
     res.render('noLoginIndex');
        }
      });  }
  })

},
  isUser: function(con,req,res,callback){
  console.log(req.body);
  let us=req.body.username;
  console.log("us:"+us);
  if (!us || !req.body.password || !req.body.email ) {
    let errorMessage='please provide username, password and email';
      res.render('registration',{"errorMessage":errorMessage});
  }   else {
    uspassViewEntity=new uspassEntity.uspass(us,req.body.password,req.body.email);
    uspassViewEntity.isUser(req,res,con,
      function(resultINS){
        console.log("isUserdan dönen:"+resultINS);
      if(resultINS){
        console.log('user is already exist');

      callback(true);
      } else {
        uspassViewEntity=new uspassEntity.uspass(us,req.body.password,req.body.email);
        uspassViewEntity.isEmail(req,res,con,
          function(resultINS){
            console.log("isEmailden dönen:"+resultINS);
          if(resultINS){
            console.log('email is already exist');
            let errorMessage='email is already exist';
          res.render('registration',{"errorMessage":errorMessage});
        } else {
        console.log('addusera gider');
        uspassViewEntity.addUser(req,res,con,function(result){
          if (result) {
            console.log('her şey okeydir');
              res.redirect('/main');
          } else {
            let errorMessage='it could not be registered';
          res.render('registration',{"errorMessage":errorMessage});
          }
        })}});
      }
      });


     }
    },
  viewUser: function(con,req,res){
  usCtrl.deleteOldSessions(con);
  var uName=req.params.username;//for data retrieve
  var cuName=req.cookies.username;
  uspassViewEntity=new uspassEntity.uspass(uName,'','');
  usCtrl.isSession(req,res,con,
    function(resultBoolean){
    if(resultBoolean==1){
      if (cuName==uName) {
        res.render( "user");
      } else {
          res.render( "userNon");
      }
    } else {
        res.render( "noLogUser");
    }
    });

  },
    changePasswordPost: function(con,req,res){
    usCtrl.deleteOldSessions(con);
    let errorMessage=true;
    let oldPass=req.body.oldPassword;
    let retype=req.body.retype;
    let newPass=req.body.newPassword;

      if(oldPass==newPass ){
            errorMessage='your new password is same as your old password';
      }
      if(newPass!=retype ){
            errorMessage='your new password is not same as retyped your password';
      }

      console.log("geçti");
      switch( errorMessage ) {
          case 'your new password is same as your old password':
              res.render( "passChange",{"name":errorMessage});
            console.log(errorMessage);
            break;
          case "your new password is not same as retyped your password":
        res.render( "passChange",{"name":errorMessage});
      console.log(errorMessage);
          break;
        default:
        usCtrl.isSession(req,res,con,
          function(resultBoolean){
            if(resultBoolean==1){
              let cAuth=req.cookies.auth_token;
              let cuName=req.cookies.username;
                errorMessage='her şey ok ';
                console.log(errorMessage);
                uspassViewEntity=new uspassEntity.uspass(cuName,oldPass,'');
                uspassViewEntity.getPassword(req,res,con,
                  function(resultPass){
                    const util = require ("../config/util");
                    oldPass=util.stringSanitizier(oldPass);
                    if (resultPass!=oldPass) {
                      errorMessage='old password is wrong ';
                        console.log(errorMessage + oldPass +'+'+resultPass);
                        res.render( "passChange",{"name":errorMessage});
                    }else {
                        errorMessage='password de tamam ';
                      uspassViewEntity=new uspassEntity.uspass(cuName,oldPass,'');
                      uspassViewEntity.updatePassword(con,newPass,res,function(resultPass){
                      console.log("resultPass:"+resultPass);
                          res.redirect('/writer/'+uspassViewEntity.username);
                    });
                    }
                });
            } else {
              errorMessage='session yok ';
              console.log(errorMessage);
                res.render( "passChange",{"name":errorMessage});
            }
          });
      }
  }
  }
