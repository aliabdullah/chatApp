var io = require('socket.io-client')
var readline = require('readline');
var readlineSync = require('readline-sync');
var url     = "ws://localhost:3000";
var options = { transports: ['websocket'] };

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
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
		console.log("You Logged in as: " + name);
		/*
		rl.question("Me: ", function(text) {
			client.emit('message', {message: text, user: name});
			rl.close();
		}
		*/

		//var text = readlineSync.question("me: ");
		console.log("me: ");
		rl.on('line', function(text) {
			client.emit('message', {message: text, user: name});
		});
	});

	client.on('getOnlineUser', function(onlineUsers) {
		if(onlineUsers.length > 0) {
			console.log("\nOnline Users");
			for(var i = 0; i < onlineUsers.length; i++) {
				console.log(onlineUsers[i]);
			}
			console.log("\n");
		} else {
			console.log("\nNo online users.\n");
		}
	});
	client.on('incomeMessage', function(message) {
		console.log(message);
	});
}