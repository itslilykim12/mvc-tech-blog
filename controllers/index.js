//Server Connection
const router = require('express').Router();
//API routes folder 
const apiRoutes = require('./api');

//Define the path for the server to the API routes 
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;