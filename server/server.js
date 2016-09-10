var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());

app.use('/content',express.static(__dirname + '/content'));
app.use('/bower_components',express.static(__dirname + '/../app/bower_components'));
app.use('/app',express.static(__dirname + '/../app'));
app.use(express.static(__dirname + '/templates'));

app.use(function (req,res) {
    res.status(404).send('page not found bate');
});

var server = app.listen(process.env.PORT || 1337, function () {
    console.log('application listening on port 1337')
});