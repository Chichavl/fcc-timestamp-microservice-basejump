'use strict';

var path = process.cwd();


module.exports = function (app) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	
	app.route('/:time')
		.get(function(req, res) {
		    console.log(req.params.time);
		    var monthNames = ["January", "February", "March", "April", "May", "June",
		    "July", "August", "September", "October", "November", "December"];
		    var obj = {};
		    //date in "unix" format
		    if (Number.isInteger(parseInt(req.params.time))) {
		    	console.log("unix format");
		    	obj.unux = req.params.time;
		    	
		    	var date = new Date(req.params.time*1000);
				// Month of date
				var month = monthNames[date.getMonth()];
				// Day part from the timestamp
				var day = "0" + date.getUTCDate()
				// Year part from the timestamp
				var year = "0" + date.getFullYear();
		    	obj.natural = month+ ' ' + day.substr(-2) + ',' + year.substr(-4);
		    }
		    else if (Number.isInteger(Date.parse(decodeURI(req.params.time)))) {
		    	console.log("human format");
		    	obj.natural = decodeURI(req.params.time);
		    	
		    	obj.unix = Date.parse(decodeURI(req.params.time))/1000;
		    }
		    else {
		    	console.log("not a date");
		    	obj.natural = null;
		    	obj.unix = null;
		    }
		    res.end(JSON.stringify(obj));
		});
};