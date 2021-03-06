var Pumpkin = require('../src/pumpkin');

var pumpkin = new Pumpkin();
pumpkin.setData({commonData : 'commonData'});

pumpkin.addWork('work1', function()
{
	var that = this;
	setTimeout(function()
	{
		console.log('- start work1');
		console.log('execute after 1 second');
		console.log('commonData : ', that.data.commonData);
		
		//set common data.
		that.data.commonData2 = 'commonData2';
		that.next('If you want to pass parameter to next work.');
	}, 1000);
});

pumpkin.addWork('work2', function()
{
	var params = arguments;
	var that = this;
	setTimeout(function()
	{
		console.log('');
		console.log('- start work2');
		console.log('execute after 0.5 second');
		console.log('commonData2 : ', that.data.commonData2);
		console.log('params : ', params[0]);
		that.next();
	}, 500);
});

pumpkin.execute(['work1', 'work2'], function()
{
	console.log('');
	console.log("done : ", this.data);
}, function(name, error){
	console.log('error : ', error);
});