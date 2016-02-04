var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var server = app.listen(8008, function() {
 console.log("listening on port 8008");
})

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	console.log(socket.id);
	var currentUser;
	socket.on('got_a_new_user', function(name) {
		console.log("servername", name);
		socket.broadcast.emit('new_user', name);
		return currentUser = name;
	})
	socket.on("message", function(input) {
		console.log(input);
		io.emit("message", {
			name: input.name,
			input: input.input
		});
	})

})	
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
})
