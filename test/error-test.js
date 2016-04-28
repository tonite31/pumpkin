var Pumpkin = require('../src/pumpkin');

var pumpkin = new Pumpkin();
pumpkin.addWork('work', function()
{
	console.log(this.data.error);
});

pumpkin.execute(['work'], function()
{
	console.log('');
	console.log("done : ", this.data);
}, function(workName, error)
{
	console.log(workName, error.stack);
});