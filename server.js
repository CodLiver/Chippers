const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// view engine setup
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var router = express.Router();
app.use('/', router);

const db = require ("./config/db");
const lis = require ("./config/listen");
const usc = require ("./controller/usersessionsController");
const postsRouter = require("./routers/postsRouter")
const sessionRouter = require("./routers/sessionRouter")
const uspassRouter = require("./routers/uspassRouter")
const viewsRouter = require("./routers/viewsRouter")
var con = db.getConnection();
const apiserver = require("./api/apiserver")(app,con);
app.use(express.static("public"))
/*test case for work*/
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  usc.deleteOldSessions(con);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function (req, res) {
  res.redirect("/main");
})

app.get('/main', function (req, res) {
  viewsRouter.main(req,res,con);
})

app.get('/writer/:username', function (req, res) {
  uspassRouter.viewUser(con,req,res);
})

app.get('/registration', function (req, res) {
  viewsRouter.getRegistration(req,res,con);
})

app.get('/write/blog', function (req, res) {
  postsRouter.getSubmitPostPage(req,res,con);
})

app.get('/post/:writer/:identifier/:title', function (req, res) {
  postsRouter.getPosts(req,res,con);
})

/*
api section
https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
*/

app.get('/changePassword', function (req, res) {
  viewsRouter.getChangePassword(req,res,con);
})

app.post('/login', function(req, res) {
  sessionRouter.login(req, res, con);
})

app.post('/signout', function(req, res) {
    sessionRouter.signoutPost(req, res, con);
})

app.post('/register', function(req, res) {
  uspassRouter.registerUser(con,req,res);
})

app.post('/submit/blog', function(req, res) {
  postsRouter.postSubmitPost(req,res,con);
})

app.post('/submit/changePassword', function(req, res) {
  uspassRouter.submitChangePassword(con,req,res);
})

//server configuration
lis.listening(app);
