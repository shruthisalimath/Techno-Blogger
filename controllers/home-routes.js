const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');

//Find all post on Homepage
router.get('/', (req, res) => {
    console.log(req.session);

    post.findAll({
      attributes: ['id','title','created_at','contents']
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
       // console.log(dbPostData[0]);
       res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //Takes user to login page
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      console.log("user already logged in");
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  //Takes user to signup page
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      console.log("user already signed in");
      res.redirect('/');
      return;
    }
    res.render('signup');
  });
  
// get single post
  router.get('/post/:id', (req, res) => {
    post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'contents',
        'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'feedback', 'post_id', 'user_id', 'created_at'],
          include: {
            model: user,
            attributes: ['username']
          }
        },
        {
          model: user,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;