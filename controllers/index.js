const router = require('express').Router();

const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');
const devHomeRoutes = require('./home-routes');

router.use('/', devHomeRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
