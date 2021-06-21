const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const userWebController = require('../controllers/userweb.controller');

// get all employees

const app = express();
app.use(bodyParser.json());


app.set("view engine", "ejs");
app.use(express.static("public"));


router.post('',userWebController.getLogin);

// // create new employee
// router.post('/register',  (req, res) => {
//     res.render("login");
// });



module.exports = router;