//Server Connection
const router = require('express').Router();
//API routes folder 
const apiRoutes = require('./api');
//Homepage routes
const homeRoutes = require('./home-routes');

//Define the path for the server to the API routes 
router.use('/api', apiRoutes);
//Define path for the homepage 
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;