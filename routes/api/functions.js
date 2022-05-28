const express = require('express');
const router = express.Router();
const functionsCtrl = require('../../controllers/functions');

router.get('/', functionsCtrl.allFuncs);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
//router.post('/', checkAuth, functionsCtrl.createf);
router.get('/explain', checkAuth, functionsCtrl.explain);
router.get('/timeComplexity', checkAuth, functionsCtrl.getTimeComplexity);
/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;
