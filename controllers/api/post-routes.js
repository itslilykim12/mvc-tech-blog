const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
//Routes
//GET all posts - /api/posts/
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at",
            ],
        order: [[ 'created_at', 'DESC' ]],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id","user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then((dbPostData) => {
        res.status(200).json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//GET a single post by id - /api/posts/:id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at",
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
    .then((dbPostData) => {
        if(!dbPostData) {
            res.status(404).json({ message: "No post foudn with this id." });
            return;
        }
        res.status(200).json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//POST create a new post - /api/posts
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then((dbPostData) => {
        res.status(200).json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//PUT update a post - /api/posts/:id
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((dbPostData) => {
        if(!dbPostData) {
            res.status(404).json({ message: "No post found with this id." });
            return;
        }
        res.status(200).json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//DELETE a post - /api/posts/:id
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((dbPostData) => {
        if(!dbPostData) {
            res.status(404).json({ message: "No Post found with this id." });
            return;
        }
        res.status(200).json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;