const path = require('path');
const fs = require('fs');
const { v4: uuid} = require('uuid');


const dirCodes = path.join(__dirname, 'codes');

//creating codes folder if non existent
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true});
}

const codeFileConfig = async (format, code) => {
    const uniqueId = uuid();

    //Java files are saved with name that has unique id and main class name since it will be require to run compiled file
    if(format == 'java'){
        let classTitle;
        let codeData = code.split(' ');
        for(let i = 0;i <= codeData.length; i++){
            console.log(codeData[i]);
            if(codeData[i] === "class"){
                classTitle = codeData[i+1]; 
                break;
            }
        }
        console.log('classtitle',classTitle);
        const filename = `${uniqueId}_${classTitle}.${format}`;
        const filepath = path.join(dirCodes, filename);
        await fs.writeFileSync(filepath, code);
        return filepath;

    }else{
        const filename = `${uniqueId}.${format}`;
        const filepath = path.join(dirCodes, filename);
        await fs.writeFileSync(filepath, code);
        return filepath;
    }
   
}

module.exports =  {codeFileConfig};