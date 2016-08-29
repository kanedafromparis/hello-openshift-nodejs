var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var PORT = process.env.PORT || 8080;
var NODE_LOCAL_FILE_PATH = process.env.NODE_LOCAL_FILE_PATH || "/www";


app.use(express.static(path.join(__dirname, NODE_LOCAL_FILE_PATH)));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});


app.post('/upload', function (req, res) {

    var form = new formidable.IncomingForm();

    form.multiples = true;
    form.uploadDir = path.join(__dirname, NODE_LOCAL_FILE_PATH);

    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', function () {
        res.end('success');
    });
    form.parse(req);

});

var server = app.listen(PORT, function () {
    console.log('Server listening on port %s', PORT);
});