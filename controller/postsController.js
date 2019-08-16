const postEntity = require("../model/posts");
const util = require("../config/util");

module.exports = {
  getPosts: function (callback,con,writer,identifier) {
    postEntity.getPosts(callback,con,writer,identifier);
  },
  getAllUserPosts: function (callback,con,writer) {
    postEntity.getAllUserPosts(function(resultPost){
      callback(jsonwrapper(resultPost));},con,writer);
  },
  getAllVisiblePosts: function(callback,con){
    postEntity.getAllVisiblePosts(function(resultPost){
      callback(jsonwrapper(resultPost));},con);
  },
  submitPost: function(con,req,res){
    //title and content are sanitized
    var title=util.stringSanitizier(req.body.title);
    var content=util.stringSanitizier(req.body.content);
    var visibility=req.body.visibility;
    if (typeof visibility =='undefined'){
      visibility=0;
    }
    postObject = new postEntity.Posts(req.cookies.username, title,content,visibility);
    postObject.add(con);
    //redirect to post page. hopefully promise doesnt fail me. create post page. res.redirect(/post/:writer/:identifier/:date?/:title(urlencoded))
    res.redirect('/post/'+postObject.username+'/'+postObject.postIdent+'/'+postObject.postTitle);//title can be encoded!!
  },
};
function jsonwrapper(resultPost){
  var finalPostArray=[];
  for(var i=0;i<resultPost.length;i++){
    var  jsonReturn = JSON.parse(JSON.stringify(resultPost[i]));
    finalPostArray.push(jsonReturn);
  }
  return finalPostArray;
}
