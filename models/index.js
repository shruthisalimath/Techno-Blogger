const post = require('./post');
const user = require('./user');
const comment = require('./comment');


// create associations
user.hasMany(post, {
    foreignKey: 'user_id'
});

post.belongsTo(user, {
    foreignKey: 'user_id'
    //onDelete: 'CASCADE'
});

comment.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

comment.belongsTo(post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { user, post, comment };