const { post } = require('../models');

const postData = [
    {
        title: "Why MVC is so important!",
        contents: "MVC allows developers to maintain a ture separation of concerns, devising their code between the model layer for data, the view layer of the design, and the controller layer for the application logic. ",
        created_at: "May 16, 2023",
        user_id: 1
    },
    {
        title: "Authentication vs. Authorization!",
        contents: "There is a diffrence between authentication and authorization. authentication means confirming your own identity, where as authorization means being allowed access to the system.",
        created_at: "May 18, 2023",
        user_id: 2
    },
    {
        title: "Object-Relational Mapping!",
        contents: "I have really loved learning about ORMS. Its really simplified the way i create queries in SQL!",
        created_at: "May 09, 2023",
        user_id: 3

    },
    {
        title: "Why choose a Coding Bootcamp!",
        contents: "I think a bootcamp is a faster route to start your career",
        created_at: "Feb 13, 2023",
        user_id: 4
    },
    {
        title: "Just Tech News goes public!",
        contents: "Just Tech News—a tech news website where users can post, Just Tech News—a tech news website where users can post, upvote, and comment on links to news articles. Use Sequelize, an object-relational mapping (ORM) library, to simplify your MySQL queries",
        created_at: "Apr 27, 2023",
        user_id: 5
    },
    {
        title: 'Sequelize Data Types',
        contents: 'Sequelize has several built in, handy data types that you can use when you define a model.  The most commonly used for simple databases are INTEGER and STRING.',
        user_id: 1,
      },
      {
        title: 'Handlebars Template Engine',
        contents: 'Handlebars is a very useful npm package that allows you to use templates in your code, making things more modular, re-usable, and maintainable.  For instance, you can set up a layout used for several pages with templates for a home page and a user dashboard.',
        user_id: 2,
      },
      {
        title: 'Handlebars Partials',
        contents: 'Partials are another handlebars feature where you can create a partial bit of code for something like post information, or for a comment. You can then use that partial whenever that bit of information is needed for your website.',
        user_id: 3,
      },
      {
        title: 'Sessions',
        contents: 'When a user logs in, a session can be established using a package such as Express Session. A cookie will be saved on the user computer, authenticating them on the website. Cookies can be set for a limited time or indefinitely.',
        user_id: 4,
      },
      {
        title: 'Hashing',
        contents: 'A very important part of user authentication is hashing passwords. When a user creates a password and when they log in, sensitive information like the password should be protected. bcrypt is a popular npm package that accomplishes this task.',
        user_id: 5,
      },
      {
        title: 'Express.js',
        contents: 'Express.js is an easy way to set up a server with JavaScript. With a few lines of code, you can be on your way to hosting a dynamic webpage.',
        user_id: 1,
      },
]

const seedPosts = () => post.bulkCreate(postData);

module.exports = seedPosts;