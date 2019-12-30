/**
 * random-words js file created by Tamara G. Mack on 30-Dec-19 for portfolio-api
 */
var {rword} = require('rword');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/random/word/:count', function(req, res) {
  const { count } = req.params;

  if (isNaN(count)){
    res.status(404).send({error: 'Count is NOT a number'});
  } else {
    let { options } = req.query;
    options = options && JSON.parse(options);

    const results = rword.generate(+count, options);
    res.status(201).json({
      words: Array.isArray(results) ? results : [results]
    });
  }
});

module.exports = router;
