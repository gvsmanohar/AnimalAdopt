var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    var original = file.originalname;
    var file_extension = original.split(".");
    // Make the file name the date + the file extension
    filename =  Date.now() + '.' + file_extension[file_extension.length-1];
    cb(null, filename);
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET adopt page. */
router.get('/adopt', function(req, res, next) {
  res.render('adopt', { title: 'Adopt', data:{} });
});

/* GET donate page. */
router.get('/donate', function(req, res, next) {
  res.render('donate', { title: 'Donate', data:{} });
});

const animal = require('../controllers/animals');

/* POST search animals. */
router.post('/search', function(req, res) {
  animal.list(req,res);
});

/* POST add animal. */
router.post('/donate', upload.single('animalphoto'), function(req, res) {
  console.log(req);
  animal.create(req,res);
});

/* GET animal page. */
router.get('/animal', function(req, res, next) {
  animal.getAnimal(req,res);
});

const applicantinfo = require('../controllers/applicantinfo');

/* POST adoption applicant Details. */
router.post('/applicantdata', function(req,res){
    applicantinfo.insert(req,res);
});

const comments = require('../controllers/comments');

/* POST user comments. */
router.post('/addcomments', function(req,res){
  comments.insert(req,res);
});

/* POST/GET user comments for animal page. */
router.post('/usercomments', function(req,res){
  comments.getcomment(req,res);
});

const queries = require('../controllers/queries');

/* POST user queries. */
router.post('/savequery', function(req,res){
  queries.insert(req,res);
});


module.exports = router;

