# Pumpkin

Pumpkin is a nodejs(or javascript) module for solving callback hell.

## Example
```javascript
//If you want to use pumpkin on html, you don't have to require.
var Pumpkin = require('nodejs-pumpkin');

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
});

//If you want to using async.
pumpkin.executeAsync(['work1', 'work2'], function()
{
	console.log('');
	console.log("done : ", this.data);
});
```

## Error handling
```javascript
var Pumpkin = require('nodejs-pumpkin');

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
```
```javascript
var Pumpkin = require('nodejs-pumpkin');

var pumpkin = new Pumpkin();
pumpkin.addWork('work', function()
{
	this.error('error');
});

pumpkin.execute(['work'], function()
{
	console.log('');
	console.log("done : ", this.data);
}, function(workName, error)
{
	console.log(workName, error);
});
```

## Execute work with parameter.
```javascript
var Pumpkin = require('nodejs-pumpkin');

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
```