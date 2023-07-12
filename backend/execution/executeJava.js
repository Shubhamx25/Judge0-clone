const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');


const parentFolder = path.resolve(__dirname, "..");
const outputFolderPath = path.join(parentFolder, "outputs");

if(!fs.existsSync(outputFolderPath)){
    fs.mkdirSync(outputFolderPath,{recursive: true});
}

const executeJava =async (filePath) => {
    const uniqueId =path.basename(filePath).split('.')[0]
    const classTitle = path.basename(filePath).split('_')[1].split('.')[0];
    console.log(classTitle);
    let outPath = path.join(outputFolderPath, `${uniqueId}`);
    
    return new Promise((resolve, reject) => {
        console.log(`javac ${filePath} -d ${outPath} && cd ${outputFolderPath} && java ${classTitle}`);
        exec(`javac ${filePath} -d ${outPath} && cd ${outPath} && java ${classTitle}`,(error, stdout, stderr) => {
            error && reject({error,stderr});
            stderr && reject(stderr);
            resolve(stdout);
        })
    })
}
 
module.exports = executeJava;