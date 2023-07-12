const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.json({msg: 'Route working'});
})




// router.post('/login',user_login);

// router.post('/register', user_register); 

module.exports = router;