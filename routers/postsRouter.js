const postCtrl = require("../controller/postsController");
const usCtrl = require("../controller/usersessionsController");
const viewdir ="./view/";

module.exports = {
  //get requests
  getPosts: function(req, res, con){
    var writer=req.params.writer.toString();
    var identifier=req.params.identifier.toString();
    var cuName=req.cookies.username;
    postCtrl.getPosts(function(resultPost){
      if (resultPost.length==1){
        usCtrl.isSession(req,res,con,function(resultSesh){
          if (resultSesh==1){
                if (cuName==writer){
                  res.sendFile("userPost.html", {root: viewdir});
                }else{
                  res.sendFile("userNonPost.html", {root: viewdir});
                }
              }else{
                res.sendFile("noLogPost.html", {root: viewdir});
              }
            });
          }else{
            res.sendFile("noSuchPage.html", {root: viewdir});
          }

        },con,writer,identifier);

  },
  getSubmitPostPage:function(req,res,con){
    usCtrl.isSession(req,res,con,function(resultSesh){
      if (resultSesh==1){
        res.sendFile("writeBlog.html", {root: viewdir});
      }else{
        res.redirect('/main');
      }
    });
  },
  //post request
  postSubmitPost: function(req,res,con){
    usCtrl.isSession(req,res,con,function(resultSesh){
    if (resultSesh==1){
      postCtrl.submitPost(con,req,res);
    }else{
      res.status(400);
      res.send('Error 400');
      }
    });
  }

};
