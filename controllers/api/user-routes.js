const router = require('express').Router();
//User, Post and Comment Models
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize');

//Routes
//GET all users - /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then((dbUserData) => {
        res.status(200).json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//GET a single user by id - /api/users/:id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at'],
            },
            {
                model: Comment,
                attributes: ['id','comment_text', 'post_id','user_id', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id." });
            return;
        }
        res.status(200).json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//POST add a new user - /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then((dbUserData) => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        })
        res.status(200).json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//POST login route for a user - /api/users/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        },
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(400).json({ message: "No user found with this email." });
            return;
        }
        //verify the password is correct with the username
        const validPassword = dbUserData.checkPassword(req.body.password);
        //if the password is invalid(method returns false) method return an error
        if(!validPassword) {
            res.status(400).json({ message: "Incorrect Password!" });
            return;
        }
        req.session(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        
        res.json({ user:dbUserData, message: "You are now logged in!" });
        });
    });
});
//POST logout and existing user - /api/user/logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
//PUT update an existing user - /api/users/id
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id." });
            return;
        }
        res.status(200).json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//DELETE an existing user - /api/users/:id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id." });
            return;
        }
        res.status(200).json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;