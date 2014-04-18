var Interfake = require('interfake');
var api;

api = new Interfake({debug:true});
api.serveStatic('/', './todoapp');
api.get('/api/todos').body({
	todos: [
		{
			id: 0,
			title:'Yo!'
		}
	]
});
api.listen(3000);