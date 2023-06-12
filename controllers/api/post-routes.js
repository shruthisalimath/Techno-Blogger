const router = require('express').Router();
const { post, user ,comment} = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
    post.findAll({
      attributes: ['id', 'title', 'created_at', 'contents'],
      order: [['created_at', 'DESC']]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // find  posts by one user
  router.get('/:id', (req, res) => {
    post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'contents','created_at'],
      include: [
         // include the Comment model here:
         {
          model: comment,
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
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Signed in Users can create new posts
router.post('/', withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', content: 'blog contents', user_id: 1}
    post.create({
      title: req.body.title,
      contents: req.body.contents,
      user_id: req.session.user_id
      //user_id : req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Signed in Users can edit their posts
router.put('/:id', withAuth,(req, res) => {
    post.update(
      {
        title: req.body.title,
        contents : req.body.contents
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//Signed in users can delete their posts
router.delete('/:id',withAuth, (req, res) => {
    post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;