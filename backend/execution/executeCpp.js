const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');

const parentDirectory = path.resolve(__dirname, '..');

const outputFolderPath = path.join(parentDirectory, 'outputs');

//creating outputs folder if non existent
if(!fs.existsSync(outputFolderPath)){
    fs.mkdirSync(outputFolderPath, {recursive:true});
}

const executeCpp = async (filePath) => {
    //extracts unique id from file name of the code file
    const basenameId = path.basename(filePath).split('.')[0];

    //creating file in outputs folder with this name
    const outPath = path.join(outputFolderPath, `${basenameId}.out`);
    
    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputFolderPath} && .\\${basenameId}.out`,
            (error, stdout, stderr) => {
            error && reject({error, stderr});
            stderr && reject(stderr);
            resolve(stdout);
            })
        
    }); 
    return true;
    
}

module.exports = executeCpp;
