const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    Post.findAll({
        //Query configuration 
        //From the post table 
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
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
//Render the single post page 
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id','user_id','created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then((dbPostData) => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id.'});
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//Render the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;