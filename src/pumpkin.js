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

Pumpkin.prototype.execute = function(list, done, error, index, params)
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
		try
		{
			work.call({data : this.data, next : function(params)
			{
				that.execute(list, done, error, index+1, params);
			}, error : function(err)
			{
				if(error)
					error(list[index], err);
			}}, params);
		}
		catch(err)
		{
			if(error)
				error(list[index], err);
		}
	}
};

try
{
	module.exports = Pumpkin;	
}
catch(err)
{}