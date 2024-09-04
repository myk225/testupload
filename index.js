const http=require('http');
const formidable=require('formidable');
// const errors = require('formidable/FormidableError');
const fs=require('fs');
const path = require('path');
const { Readable } = require('stream');
const server=http.createServer(async(req,res)=>{
    if(req.url=="/api/upload" && req.method.toLowerCase() === "post"){
        const form=new formidable.IncomingForm();
        let fields;
        let files;
        try {
            [fields,files]=await form.parse(req);
            console.log("--------------------")
            console.log(fields)
            console.log("--------------------")
            console.log(files.multipleFiles)
            // lets write a logic to save a single file first
            console.log(files.multipleFiles)
            if(files.multipleFiles){
                const oldPath=files.multipleFiles[0].filepath;
            
                const newPath=path.join(__dirname,'uploads',files.multipleFiles[0].originalFilename);
                const readStream=fs.createReadStream(oldPath,{highWaterMark: 200});
                const writeStream=fs.createWriteStream(newPath);
                let count=1;
                readStream.pipe(writeStream);
    
                writeStream.on('finish',()=>{
                    console.log("Data has been written successfully");
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain',
                    },)
                    res.end("successfully uploaded video")
                })
            }
            // fs.rename(oldPath,newPath,(err)=>{
            //     if (err) {
            //         res.writeHead(500, { 'Content-Type': 'text/plain' });
            //         res.end('Internal Server Error');
            //         return;
            //       }
          
            //       res.writeHead(200, { 'Content-Type': 'text/plain' });
            //       res.end('File uploaded successfully');
            // })
      
        } catch (error) {
            console.error(error);
            res.writeHead(error.httpCode || 400,{
                'Content-Type' : 'text/plain',
            },)
            res.end(String(error))
        }
    }


    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>With Node.js <code>"http"</code> module</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
    `);
})

server.listen(8080, () => {
    console.log('Server listening on http://localhost:8080/ ...');
  });