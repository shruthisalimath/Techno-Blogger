const router = require('express').Router();
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all coments
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    comment.findAll({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//Get comments by ID
router.get('/:id', (req, res) => {
    comment.findOne(
        {
            where: { id: req.params.id }
        })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comments here' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create New comment
router.post('/', withAuth, (req, res) => {
    // check the session
    //if (req.session) {
    comment.create({
        feedback: req.body.feedback,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    // }

});

// To update any comment
router.put('/:id', withAuth, (req, res) => {
    comment.update(
        {
            feedback: req.body.feedback
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            return res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Only signed in users can delete comments
router.delete('/:id', withAuth, (req, res) => {
    comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;