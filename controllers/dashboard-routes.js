const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts for dashboard
router.get('/', withAuth, (req, res) => {
    post.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'contents',
            'created_at'],
        include: [
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
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Once signed in, edit existing posts
router.get('/edit/:id', withAuth, (req, res) => {
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

            // serialize the data
            const post = dbPostData.get({ plain: true });

            // pass data to template
            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/add', withAuth, (req, res) => {
    res.render('add-post');
});

module.exports = router;