const rand = require("randomstring");
function Posts (username, postTitle,content,visibility) {
    this.username = username;
    this.postTitle = postTitle;
    this.content = content;
    this.visibility = visibility;
    this.time = '';
    this.postIdent = '';
    this.image ='';
    this.postID ='';
}

Posts.prototype= {
  add:function (con)  {
      this.postIdent=rand.generate(10);
      this.postID =this.username+this.postIdent;
      var sql="INSERT INTO posts VALUES('"+this.postID+"','"+this.username+"','"+this.postTitle+"','"+this.content+"',NOW(),'none','"+this.visibility+"','"+this.postIdent+"');";
      con.query(sql, function (err, resultINS) {});
  }
}

//https://stackoverflow.com/questions/20534702/node-js-use-of-module-exports-as-a-constructor
module.exports = {
  Posts:Posts,
  getPosts: function (callback,con,writer,identifier){
    con.query("SELECT * FROM posts WHERE postID = '"+writer+identifier+"';", function (err, resultPost) {
        var jsonReturn = JSON.parse(JSON.stringify([resultPost[0]]))
        callback(jsonReturn);
    });
  },
  getAllUserPosts: function (callback,con,writer){
    con.query("SELECT * FROM posts WHERE username = '"+writer+"';", function (err, resultPost) {
        callback(resultPost);
    });
  },
  getAllVisiblePosts: function(callback,con){
    con.query("SELECT * FROM posts WHERE visibility = 1;", function (err, resultPost) {
        callback(resultPost);
    });
  }
};
