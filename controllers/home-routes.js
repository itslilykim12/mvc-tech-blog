const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        //Query configuration 
        //From the post table 
        attributes: [
            'id',
            'post_text',
            'title',
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id','comment_text','post_id','user_id','created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then((dbPostData) => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {posts});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Render the login page
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;