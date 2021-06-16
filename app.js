var express = require('express');
var app = express();
var mongodbutil = require('./database/database');
var bodyParser = require('body-parser');

mongodbutil.connectToServer(function (err) {
    var actionsRouter = require('./routers/actions');
    app.use('/actions', actionsRouter);
});

app.use(bodyParser.json());
app.listen(8000)