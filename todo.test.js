/* globals describe, it, beforeEach, afterEach */

var assert = require('assert');
var Nightmare = require('nightmare');
var Interfake = require('interfake');

describe('A new To Do', function(){
	var api;

	beforeEach(function () {
		api = new Interfake();
		api.serveStatic('/', './todoapp');
		api.listen(3000);
	});

	afterEach(function () {
		api.stop();
	});

	describe('a pre-populated todo list', function() {
		it('should a todo list', function(done) {
			api.get('/api/todos').status(200).body({
				todos: [
					{
						id:0,
						title:'Do some stuff'
					}
				]
			});

			this.timeout(5000);
			new Nightmare()
				.goto('http://localhost:3000/')
				.type('#new-todo', 'Write some automation tests')
				.evaluate(function () {
					return document.querySelector('#todo-list > li > label').textContent;
				}, function (existingValue) {
					assert.equal(existingValue, 'Do some stuff');
				})
				.screen('./test1.png')
				.run(function() {
					console.log('YO!');
					done();
				});
		});
	});
});