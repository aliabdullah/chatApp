var io     = require("socket.io");
var server = io();

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
  		console.log("User " + username + " is online");
  	});
  	
  	socket.on('disconnect', function() {
  		var index = onlineUsersIds.indexOf(socket.id);
  		var id = socket.id;
		console.log("User " + onlineUsersNames[index] + " is offline");
		onlineUsersNames.splice(index, 1);
		onlineUsersIds.splice(index, 1);
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

server.listen(3000);