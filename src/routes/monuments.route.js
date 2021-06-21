const express = require('express');
const router = express.Router();

const monumentscontroler = require('../controllers/monuments.controler');

// get all employees
router.get('/monuments', monumentscontroler.getMonumentsList);




module.exports = router;