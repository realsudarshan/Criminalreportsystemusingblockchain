const express = require('express');
const router = express.Router();
const {
  addToDB,
  validate,
  viewFromDB,
  addToBlockchain,
  fetchAllDataFromDatabase
} = require('../controllers/caseController');

router.post('/add', addToDB);
router.get('/validate/:id', validate);
router.get('/view/:id', viewFromDB);
router.get('/add-to-blockchain/:id', addToBlockchain);


router.get('/fetch-all', fetchAllDataFromDatabase);


module.exports = router;