const express = require('express');
const  {codeFileConfig: genCodeFile}  = require('../codeFileConfig');
const executeCpp = require('../execution/executeCpp');
const executePy = require('../execution/executePy');
const executeJava = require('../execution/executeJava');

const router = express.Router(); 

router.get('/', (req,res) => {
    res.json({msg: "handling code"});
})

router.post('/run', async (req,res) => {
    const {code, language = 'cpp'} = req.body;
    
    if(code === undefined){
        return res.status(400).json({success: false, error: "Empty code "});
    }
    
   try{
         //creating code file
        let filepath = await genCodeFile(language, code);
        let output;
        if(language === "cpp"){
            output = await executeCpp(filepath);
        }
        if(language === "py"){
            output = await executePy(filepath);
        } 
        if(language === "java"){
            output = await executeJava(filepath);
        } 
        return res.json({filepath, output});
   }catch(err){
        res.status(500).json(err);
   }
   
}) 

module.exports = router;