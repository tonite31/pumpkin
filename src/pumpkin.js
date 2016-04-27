var Pumpkin = function()
{
	this.data = null;
	this.works = {};
};

Pumpkin.prototype.setData = function(data)
{
	this.data = data;
};

Pumpkin.prototype.addWork = function(name, work)
{
	this.works[name] = work;
};

Pumpkin.prototype.execute = function(list, done, index, params)
{
	if(list)
	{
		if(!index)
			index = 0;
		
		if(typeof index == 'object')
		{
			params = index;
			index = 0;
		}
		
		if(list.length == index)
		{
			done.call({data : this.data}, params);
			return;
		}
		
		var that = this;
		var work = this.works[list[index]];
		work.call({data : this.data, next : function(params)
		{
			that.execute(list, done, index+1, params);
		}}, params);
	}
};

module.exports = Pumpkin;