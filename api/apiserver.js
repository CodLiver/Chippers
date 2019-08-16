const express = require('express');
const app = express();
const postapi = require ("./postingAPI");

module.exports = function(app,con){
/* 1.6
* GET /json/post/:writer/:identifier/:api
* check api if in db
* if not: error
* if in:
* send the post in json format
* SINGLE POST
* username,time,title, content, image(tba)
*/
app.get('/json/post/:writer/:identifier/:api', function (req, res) {
  postapi.getPosts(con,req,res);
})

/* 1.7
* GET /json/posts/all/:writer/:api
* If api correct:
* bring all posts of :writer
* if not: error
* ALL POSTS OF WRITER
*/
app.get('/json/posts/all/:writer/:api', function (req, res) {
  postapi.getAllUserPosts(con,req,res);
})

/* 1.8
* GET /json/posts/all/:api
* If api correct:
* bring all visible posts
* if not: error
* ALL VISIBLES
*/
app.get('/json/posts/all/:api', function (req, res) {
  postapi.getAllVisiblePosts(con,req,res);
})

}
