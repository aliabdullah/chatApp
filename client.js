var io = require('socket.io-client')
var readline = require('readline');
var url     = "ws://localhost:3000";
var options = { transports: ['websocket'] };

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var argumentLength = process.argv.length;
if(argumentLength < 3 || process.argv.slice(2).toString()[0] != '-') {
	console.log("node client.js -username");
	console.log("ex: node client.js -aliabdallah");
} else {
	var client  = io(url, options);
	var name = process.argv.slice(2).toString().substring(1);
	client.on('connect', function() {
		client.emit('connected', name);
	});

	client.on('getOnlineUser', function(onlineUsers) {
		if(onlineUsers.length > 0) {
			console.log("\nOnline Users\n");
			for(var i = 0; i < onlineUsers.length; i++) {
				console.log(onlineUsers[i]);
			}
			rl.question("Chat with: ", function(answer) {
				console.log("Your Answer", answer);
				rl.close();
			})
		} else {
			console.log("No online users.");
		}
	});
}