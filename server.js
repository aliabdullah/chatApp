var io     = require("socket.io");
var server = io().listen(3000);

var onlineUsersIds = [];
var onlineUsersNames = [];

var printOnlineUsersNames = function() {
	console.log("\n");
	if(onlineUsersNames.length > 0) {
		console.log("Online Users Now");
		for(var i = 0; i< onlineUsersNames.length; i++) {
			console.log(onlineUsersNames[i]);
		}
	} else {
		console.log("No online users.");
	}
	console.log("\n");
};
console.log("server connected");
server.on("connection", function (socket) {

	socket.emit('getOnlineUser', onlineUsersNames);

  	socket.on('connected', function(username) {
  		onlineUsersNames.push(username);
  		onlineUsersIds.push(socket.id);
  		var message = "User " + username + " is online";
  		console.log(message);
  		server.sockets.emit('connectUser', message);
  	});
  	
  	socket.on('disconnect', function() {
  		var index = onlineUsersIds.indexOf(socket.id);
  		var id = socket.id;
		var message = "User " + onlineUsersNames[index] + " is offline";
		console.log(message);
		onlineUsersNames.splice(index, 1);
		onlineUsersIds.splice(index, 1);
		server.sockets.emit('disconnectUser', message);
	});

  	socket.on('message', function(userMessage) {
  		var message = userMessage.user + ": " + userMessage.message;
  		console.log("" + message);
  		server.sockets.emit('incomeMessage', message);
  	});

  	//setTimeout(function() {}, 5000);

  /*
  var message = "Hello Idiot";
  socket.emit("message", message);

  socket.on("talk", function (d) {
    console.log("msg: "+ d);
  });
	*/
});

/*
	socket.on('message', function(userMessage) {
  		console.log(userMessage);
  		server.broadcast.emit(userMessage.user + ": " + userMessage.message);
  	});
*/
