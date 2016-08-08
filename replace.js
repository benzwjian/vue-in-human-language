var fs = require('fs')
var path = require('path');
var root = './src/';
var target = './annotated-src/';

var pathToTarget = function(dir) {
	var tokens = dir.split('/'), oPath = target;
	for(var i=1; i<tokens.length; i++){
		oPath = path.join(oPath, tokens[i]);
	};
	return oPath;
};

var writeFile = function(dir) {
	fs.readFile(dir, 'utf8', function (err,data) {
	  if (err) return console.log(err);

	  var result = data.replace(/\/\/\s(.*)/g, function(s, p1, p2) {
	  	return '/* ' + p1 + ' */';
	  });

	  fs.writeFile(pathToTarget(dir), result, 'utf8', function (err) {
	     if (err) return console.log(err);
	  });
	});
};


var listUp = function(dir) {
	fs.readdir(dir, function(err, files) {
		if (err) return console.log(err);

		files.forEach(function(filename) {
			fs.stat(path.join(dir, filename), function(err, stat) {
				if (err) return console.log(err);

				if (stat.isFile()) {
					console.log(path.join(dir, filename));
					writeFile(path.join(dir, filename));
				}
				else if (stat.isDirectory()) {
					console.info(path.join(dir, filename));
					fs.mkdir(pathToTarget(path.join(dir, filename)), 0777, function(err) {
						if (err) return console.log(err);
						listUp(path.join(dir, filename));
					});
				};
			});
			
		});
	});
};

listUp(root);