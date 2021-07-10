const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
//Routes 
//GET all comments - /api/comments 
router.get('/', (req, res) => {
    Comment.findAll()
    .then((dbCommentData) => {
        res.status(200).json(dbCommentData);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });
});
//POST create a new comment - /api/comments 
router.post('/', withAuth, (req, res) => {
    if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then((dbCommentData) => {
        res.status(200).json(dbCommentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    }
});
//DELETE a comment -/api/comments/:id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((dbCommentData) => {
        if(!dbCommentData) {
            res.status(404).json({ message: "No comment found with this id." });
            return;
        }
        res.status(200).json(dbCommentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;