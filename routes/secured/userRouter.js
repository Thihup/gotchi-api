const express = require('express');
const router = express.Router();
const controller = require('../../controllers/characterController');

router.get('/character', controller.get);
router.post('/character', controller.post);
router.put('/character', controller.put);
router.delete('/character', controller.delete);

module.exports = router;