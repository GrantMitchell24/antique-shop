const router = require('express').Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const loginRoutes = require('./login-routes');
// const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/login', loginRoutes);

module.exports = router;
