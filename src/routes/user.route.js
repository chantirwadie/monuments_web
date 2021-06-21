const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/user.controller');

// get all employees
router.get('/api', employeeController.getUserList);

router.post('/loginapi',employeeController.getLogin);


// router.post('/login',employeeController.getLogin);

// // create new employee
router.post('/registerapi', employeeController.createNewUser);



module.exports = router;