const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/authControllers')

router.post('/register', register);

router.post('/', login);




// router.post('/login',user_login);

// router.post('/register', user_register); 

module.exports = router;