var Interfake = require('interfake');
var api;

api = new Interfake({debug:true});
api.serveStatic('/', './todoapp');
api.get('/api/todos').status(200).body({
	todos: [
		{
			id:0,
			title:'Do some stuff'
		}
	]
});

api.post('/api/todos').status(201).creates.get('/api/todos').status(200).body({
	todos: [
		{
			id:0,
			title:'Do some stuff'
		},
		{
			id:1,
			title:'Write some automation tests'
		}
	]
});
api.listen(3000);