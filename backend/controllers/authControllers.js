const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try{
     const {userName, email, password} = req.body;
 
     //hashing the password
     const saltRounds = 10;
     const hashPassword =  bcrypt.hashSync(password, saltRounds);
 
     const payload = {
         userName,
         email,
         password: hashPassword
     }
 
     await User.create(payload); 
 
      return res.json({msg:'Register successful'});
    }catch(error){
      return res.status(500).json(error);
    }
}

const login = async (req,res) => {
    try{
      const {email, password} = req.body;
      let user= await User.find({email})
      if(!user)return res.status(401).json({msg:'User doesn\'t exist'});
      
      const isPassword = bcrypt.compareSync(password, user[0].password);
      if(!isPassword) return res.status(401).json({msg:'Wrong Password'});
      
      //creating tokens
      jwt.sign({userName: user[0].userName}, process.env.JWT_KEY, (err, asyncToken) => {
        if (err) throw err;
        console.log(asyncToken);
      });

      

      return res.json({msg:'login successful'});
    }catch(err){
      return res.status(500).json(err.message);
    }
}

module.exports = {register, login}