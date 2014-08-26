var io = require("socket.io-client")
var url     = "ws://localhost:3000";
var options = { transports: ['websocket'] };
var client  = io(url, options);

var name = "";
