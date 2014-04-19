var Interfake = require('interfake');
var api;

module.exports = {
	options: {
		beforeEach: function () {
			console.log('Starting Interfake server');
			api = new Interfake();
			api.serveStatic('/', './todoapp');
			api.listen(3000);
		},
		afterEach: function (a) {
			console.log('Stopping Interfake server');
			api.stop();
			api = undefined;
		},
	},
	'Existing todo item displays': function (test) {
		api.get('/api/todos').status(200).body({
			todos: [
				{
					id:0,
					title:'Do some stuff'
				}
			]
		});
		test
			.open('http://localhost:3000/')
			.assert.text('#todo-list > li > label').is('Do some stuff', 'It has title')
			.screenshot('1.png')
			.done();
	},
	'New todo item is added to list': function (test) {
		api.get('/api/todos').status(200).body({
			todos: []
		});

		api.post('/api/todos').status(201).creates.get('/api/todos').status(200).body({
			todos: [
				{
					id:0,
					title:'Write some automation tests'
				}
			]
		});

		test
			.open('http://localhost:3000/')
			.type('#new-todo', 'Write some automation tests')
			.assert.val('#new-todo').is('Write some automation tests', 'The correct text was typed')
			.sendKeys('#new-todo', '\uE006')
			.assert.text('#todo-list > li > label').is('Write some automation tests', 'It has title')
			.screenshot('2.png')
			.done();
	}
};