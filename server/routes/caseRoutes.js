const express = require('express');
const router = express.Router();
const { 
  createCase, 
  verifyCaseIntegrity 
} = require('../controllers/caseController');

router.post('/', createCase);
router.get('/verify/:id', verifyCaseIntegrity);

module.exports = router;