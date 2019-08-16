const express = require('express');
const app = express();
const postCtrl = require ("../controller/postsController");

//learn way to have the con

module.exports = {

  /* 1.6
  * GET /json/post/:writer/:identifier/:api
  * check api if in db
  * if not: error
  * if in:
  * send the post in json format
  * SINGLE POST
  * username,time,title, content, image(tba)
  */
  //how to separate
  getPosts: function (con,req,res){
    var writer=req.params.writer.toString();
    var identifier=req.params.identifier.toString();
    var api=req.params.api.toString();

    if (api=="VyRghZo5CmTU4uIocL4G"){

      postCtrl.getPosts(function(resultPost){
        if (resultPost.length==1){
          res.send(resultPost);
        }else{
          res.status(400);//how?
          res.send('Error 400');
        }
      },con,writer,identifier);

    }else{
      res.status(400);
      res.send('Error 400');
    }

  },

  /* 1.7
  * GET /json/posts/all/:writer/:api
  * If api correct:
  * bring all posts of :writer
  * if not: error
  * ALL POSTS OF WRITER
  */
  getAllUserPosts: function (con,req,res) {
    var writer=req.params.writer.toString();
    var api=req.params.api.toString();
    if (api=="VyRghZo5CmTU4uIocL4G"){

      postCtrl.getAllUserPosts(function(resultPost){
        if (resultPost.length>0){
          res.send(resultPost);
        }else{
          res.send({"error":"no post available"});
        }
      },con,writer);
    }else{
      res.status(400);
      res.send('Error 400');
    }

  },

  /* 1.8
  * GET /json/posts/all/:api
  * If api correct:
  * bring all visible posts
  * if not: error
  * ALL VISIBLES
  */
  getAllVisiblePosts: function(con,req,res){

    var api=req.params.api.toString();
    if (api=="VyRghZo5CmTU4uIocL4G"){

      postCtrl.getAllVisiblePosts(function(resultPost){
        if (resultPost.length>0){
          res.send(resultPost);
        }else{
          res.send({"error":"no post available"});
        }
      },con);

    }else{
      res.status(400);
      res.send('Error 400');
    }

  }
}
