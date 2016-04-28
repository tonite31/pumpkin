var Pumpkin = require('../src/pumpkin');

var pumpkin = new Pumpkin();
pumpkin.addWork('work', function()
{
	this.next();
});

pumpkin.addWork('work2', function(params)
{
	console.log('username : ', params.username);
	this.next();
});

pumpkin.execute(['work', {name : 'work2', params : {username : 'user'}}], function()
{
	console.log("done");
}, function(workName, error)
{
	console.log(workName, error.stack);
});