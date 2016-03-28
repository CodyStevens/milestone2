var express = require('express');
var router = express.Router();

var til = [];

/* READ all: GET til listing. */
router.get('/', function(req, res, next) {
  req.db.driver.execQuery(
    "SELECT * FROM til;",
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.render('til/index', { title: 'Today I Learned', til: data });
    }
  );

});

/* CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

/*CREATE entry: POST /til/ */
router.post('/', function(req, res, next) {
  req.db.driver.execQuery(
    "INSERT INTO til (title,body) VALUES (?,?);",
    [req.body.title, req.body.body],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      res.redirect(303, '/til/index');
    }
  );
});

/* UPDATE entry form: GET /til/1/edit */
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

/* UPDATE entry: POST /til/1 */
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

/* DELETE entry: GET /til/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  req.db.driver.execQuery(
    'DElETE FROM til WHERE id=?;',
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

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /til/0 */
router.get('/:id', function(req, res, next) {
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
