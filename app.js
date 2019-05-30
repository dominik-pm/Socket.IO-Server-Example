var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

var port = 8080;
server.listen(port);
console.log("Server started. Port = " + port);

var io = require("socket.io")(server, {});

io.sockets.on("connection", function(socket)
{
    console.log("socket connection");
    socket.on('connectionSuccessful', function(msg) {
        console.log(socket.id + ' just sent a message: ' + msg);
    });
});
