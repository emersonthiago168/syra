const express = require('express');
const router = express.Router();
const SyraController = require('../controllers/SyraController');

const checkAuth = require('../helpers/auth').checkAuth;

router.get('/musicas', checkAuth, SyraController.music);
router.get('/', SyraController.showSyra);


module.exports = router;