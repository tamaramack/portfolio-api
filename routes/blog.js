/**
 * blog js file created by Tamara G. Mack on 18-Oct-19 for portfolio-api
 */
var express = require('express');
var path = require('path');

const {report} = global.TMACKAPI;
const router = express.Router();

class BlogModel {
  constructor({ _id, id, title, text, timestamp, updated} = {}) {
    id = id || _id;
    Object.assign(this, {
      _id,
      id,
      title,
      text,
      timestamp,
      updated
    });
  }
}

module.exports = ((mongoose) => {
  const Blog = require('./models/blog')(mongoose);

  router.get('/blog/generateSampleData', (req, res) => {
    let data = require(path.join(__dirname, '../bin/data/blog.json'));
    Blog.create(data, (err, list) => {
      if (err){
        res.status(500).send(err);
      } else {
        list = list.map(v => new BlogModel(v));
        res.status(201).json(list);
      }
    });
  });

  router.route('/blog/').get((req, res) => {
    Blog.find({}, (err, list) => {
      res.json(list.map(v => new BlogModel(v)));
    });
  }).post((req, res) => {
    const blog = new Blog(req.body);
    blog.save((err) => {
      if (err) res.status(500).send(err);
      else res.status(201).json(new BlogModel(blog));
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
      res.json(new BlogModel(blog));
    });
  }).put((req, res) => {
    const {params: {id}, body: {title, text}} = req;
    Blog.findById(id, (err, blog) => {
      blog.title = title;
      blog.text = text;
      blog.save((err) => {
        if (err) res.status(500).send(err);
        res.status(201).json(new BlogModel(blog));
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
