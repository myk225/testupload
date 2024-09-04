const fs=require('fs');
const path = require('path');
const readStream=fs.createReadStream(path.join(__dirname,'uploads','Admin.routes.js'),{highWaterMark:200});
readStream.on('data',function(chuck){
    console.log("chuck read---------------------------------")
    console.log(chuck.toString())
})