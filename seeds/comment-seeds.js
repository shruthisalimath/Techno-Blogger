const { comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 5,
        feedback: "This is amazing!"
    },
    {
        user_id: 4,
        post_id: 4,
        feedback: "Wow, unbelievable!"
    },
    {
        user_id: 1,
        post_id: 4,
        feedback: "Awesome! kudos to everyone who have contributed"
    },
    {
        user_id: 3,
        post_id: 5,
        feedback: "This is one of our biggest and the most awaited feature! Fantastic!"
    },
    {
        user_id: 3,
        post_id: 2,
        feedback: "This is amazing!"
    },
    {
        user_id: 3,
        post_id: 4,
        feedback: "Keep up the good work!"
    },
    {
        user_id: 5,
        post_id: 3,
        feedback: "Very useful to know!"
    },
    {
        user_id: 2,
        post_id: 1,
        feedback: "Nice!"
    },
    {
        feedback: "Wow! I didn't know about partials. Thanks!",
        post_id: 3,
        user_id: 1
      },
      {
        feedback: "TEXT is another useful data type for entering long form text data.",
        post_id: 1,
        user_id: 4
      },
      {
        feedback: "Ah, so that's what cookies are good for (besides eating ~.0)!",
        post_id: 4,
        user_id: 2
      },
      {
        feedback: "Great. Now I'm hungry for cookies.",
        post_id: 4,
        user_id: 3
      },
      {
        feedback: "Did you know about salting?",
        post_id: 5,
        user_id: 5
      },
      {
        feedback: "Yeah! Adding that random data is a great way to force a unique hashed output, even when your users all pick 'password' for their password >.< ",
        post_id: 5,
        user_id: 4
      },
]

const seedComments = () => comment.bulkCreate(commentData);

module.exports = seedComments;