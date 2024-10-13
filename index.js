const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.get('/', function (req, res) {
    fs.readdir("./files", (err, files) => {
        if(err){
            console.log(err);
        }
        res.render("index", { files: files });
    });
});

//create a notes
app.post('/create', function (req, res) {
    const fileName = req.body.title.split(' ').join('');
    const fileContent = req.body.description;

    fs.writeFile(`./files/${fileName}`, fileContent, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;

    fs.readFile(`./files/${filename}`, "utf-8", (err, filedata)=> {
        if (err) {
            console.log(err);
        }
        res.render("show", {filename: filename, filedata: filedata });
    })
});  

// //Delete a notes
// app.get("/delete", (req, res) => {
//     const fileName = req.body.title; // Getting the file name from query params

//     // Deleting the file
//     fs.unlink(`./files/${fileName}`, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         res.redirect("/"); // Redirect after successful deletion
//     });
// });





app.listen(3000);

