var express = require('express');
var router = express.Router();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '6718972',
  port: 5432
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM "User" ', (err, result) => {
    if(err){
      throw err;
    }
    res.status(200).json(result);
  })
  res.send('respond with a resource');
});

module.exports = router;
