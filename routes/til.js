var express = require('express');
var router = express.Router();

var til = [
  {title:"Entry 1", body: "The site is up and running!", created_at: "3/5/2016"},
  {title:"Entry 2", body: "Milestone 2 requirements all met!", created_at: "3/5/2016"}
];

/* READ all: GET til listing. */
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Today I Learned', til: til });
});

/* CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

/*CREATE entry: POST /til/ */
router.post('/', function(req, res, next) {
  til.push(req.body);
  res.render('til/index', { title: 'Today I Learned', til: til });
});

/* UPDATE entry form: GET /til/1/edit */
router.get('/:id/edit', function(req, res, next) {
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: til[req.params.id]
  });
});

/* UPDATE entry: POST /til/1 */
router.post('/:id', function(req, res, next) {
  til[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    til: til
  });
});

/* DELETE entry: GET /til/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  til = til.slice(0,id).concat(til.slice(id+1, til.length));
  res.render('til/index', { title: 'Today I Learned', til: til });
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /til/0 */
router.get('/:id', function(req, res, next) {
  res.render('til/entry', {title: "a entry", entry: til[req.params.id]});
});

module.exports = router;
