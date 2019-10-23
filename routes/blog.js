/**
 * blog js file created by Tamara G. Mack on 18-Oct-19 for portfolio-api
 */
var express = require('express');
var path = require('path');

const router = express.Router();
module.exports = ((mongoose) => {
  const Blog = require('./models/blog')(mongoose);

  router.get('/blog/generateSampleData', (req, res) => {
    let data = require(path.join(__dirname, '../bin/data/blog.json'));
    Blog.create(data, (err, list) => {
      if (err) res.status(500).send(err);
      else res.status(201).json(list);
    });
  });

  router.route('/blog/').get((req, res) => {
    Blog.find({}, (err, list) => {
      res.json(list);
    });
  }).post((req, res) => {
    const blog = new Blog(req.body);
    blog.save((err) => {
      if (err) res.status(500).send(err);
      else res.status(201).json(blog);
    });
  }).delete((req, res) => {
    Blog.remove({}, (err, result) => {
      if (err) res.status(500).send(err);
      else res.status(204).send(`${ result.n } Blogs removed.`);
    });
  });

  router.route('/blog/:id').get((req, res) => {
    const {id} = req.params;
    Blog.findById(id, (err, blog) => {
      res.json(blog);
    });
  }).put((req, res) => {
    const {params: {id}, body: {title, text}} = req;
    Blog.findById(id, (err, blog) => {
      blog.title = title;
      blog.text = text;
      blog.save((err) => {
        if (err) res.status(500).send(err);
        res.status(201).json(blog);
      });
    });
  }).delete((req, res) => {
    const {id} = req.params;
    Blog.findByIdAndRemove(id, (err, blog) => {
      if (err) res.status(500).send(err);
      else res.status(204).send(`Blog ${ id } removed.`);
    });
  });

  return router;
});
