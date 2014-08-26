var io     = require("socket.io");
var server = io();

var onlineUsers = [];

server.on("connection", function (socket) {

  	socket.on('connect', function(name) {
  		socket.name = name;
  		onlineUsers.push(socket);
  	});
  	
  	socket.on('disconnect', function() {
		clients.splice(clients.indexOf(socket), 1);
		console.log("Online Users Now:");
		for(var i = 0; i < clients.length; i++) {
			console.log(onlineUsers[i].name);
		}
	});
  /*
  var message = "Hello Idiot";
  socket.emit("message", message);

  socket.on("talk", function (d) {
    console.log("msg: "+ d);
  });
	*/
});



server.listen(3000);