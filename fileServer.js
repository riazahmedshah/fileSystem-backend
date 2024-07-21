const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 2000;



app.get("/files",(req, res)=>{
   fs.readdir("./files",(err,data)=>{
   if(err){
    return res.status(500).json({ error: 'Failed to retrieve files' })
   }
    res.status(200).json(data)
   })
});

// {we are not getting th result because we have write ./files/filename ==> file/:filename}app.get("./files/:filename", (req,res)=>{
//     const fileId = path.join('./files/', req.params.filename);
//     //const fileId =  req.params.filename;
//     fs.readFile(fileId, (err, data) => {
//         if (err) {
//             console.log("File not found");
//             return res.status(404).send('File not found');
//         }
//         res.send(data);
//     })
// });

app.get('/file/:filename', function (req, res) {
    const filepath = path.join(__dirname, './files/', req.params.filename);

    fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        return res.status(404).send('File not found');
    }
    res.send(data);
    });
});

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => console.log(`server starts running on PORT:${PORT}`))
