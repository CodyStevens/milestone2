var express = require('express');
var router = express.Router();

var til = [];

router.get('/', function(req, res, next) {
  console.log(req.cookies.username);
  var name = req.cookies.username || 'anonymous';
  req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.render('til/index', { title: 'Today I Learned', til: data, name: name });
    }
  );

});

router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

router.post('/', function(req, res, next) {
  req.db.driver.execQuery(
    "INSERT INTO til (title,body) VALUES (?,?);",
    [req.body.title, req.body.body],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.redirect(303, '/til/');
    }
  );
});

router.get('/:id/edit', function(req, res, next) {

  req.db.driver.execQuery(
    'SELECT * FROM til WHERE id=?;',
    [parseInt(req.params.id)],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.render('til/update',
      {
        title: 'Update an entry',
        entry: data[0]
      });
    }
  );

});

router.post('/:id', function(req, res, next) {
  var id=parseInt(req.params.id);

  req.db.driver.execQuery(
    "UPDATE til SET title=? ,body=? WHERE id=?;",
    [req.body.title, req.body.body, parseInt(req.params.id)],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.redirect(303, '/til/' + id);
    }
  );

});

router.get('/:id/delete', function(req, res, next) {
  req.db.driver.execQuery(
    'DELETE FROM til WHERE id=?;',
    [parseInt(req.params.id)],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.redirect(303, '/til/');
    }
  );
});

router.get('/:id', function(req, res, next) {
  console.log("GET entry id");
  req.db.driver.execQuery(
    'SELECT * FROM til WHERE id=?;',
    [parseInt(req.params.id)],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.render('til/entry', {title: "a entry", entry: data[0]});
    }
  );

});

module.exports = router;
