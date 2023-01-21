#!/usr/bin/env node

var doc = `sync-version

Usage:
  sync-version [--list] [<files>...]
  
Options:
  <files>    Sync version number with package.json inside <file>.
  -l --list  List current version.`,

	fs = require("fs"),
	docopt = require("docopt"),
	path = require("path"),
	pkg = getPackage(),
	
	args = docopt.docopt(doc, {version: "1.0.1"}),
	
	res = [
		/\bversion["']?:\s*["']?([^\s'"]+)/,
		/^\/\/ @version\s+(\S+)/m
	];
	
if (!pkg.version) {
	throw "cannot find version property in package.json";
}

console.log("Under " + pkg.name);
console.log("package.json\t" + pkg.version);

var i, files = args["<files>"];
for (i = 0; i < files.length; i++) {
	if (args["--list"]) {	
		logVersion(files[i]);
	} else {
		syncVersion(files[i]);
	}
}

function getPackage() {
	var searchPath = process.cwd(),
		pkg, pkgPath, nextSearchPath;
	
	do {
		try {
			pkgPath = path.join(searchPath, "package.json");
			pkg = fs.readFileSync(pkgPath);
		} catch (err) {
			// pass
		}
		nextSearchPath = path.dirname(searchPath);
		if (searchPath == nextSearchPath) {
			throw "Can't find package.json";
		}
		searchPath = nextSearchPath;
	} while (pkg == null);

	return JSON.parse(pkg);
}
	
function matchVersion(data) {
	var i, match;
	for (i = 0; i < res.length; i++) {
		match = data.match(res[i]);
		if (match) return match;
	}
}

function logVersion(file) {
	fs.readFile(file, "utf8", function(err, data){
		if (err) {
			throw err;
		}
		var match = matchVersion(data);
		if (!match) {
			throw "cannot find version property in " + file;
		}
		console.log(file + "\t" + match[1]);
	});
}

function syncVersion(file) {
	fs.readFile(file, "utf8", function(err, data) {
		if (err) {
			throw err;
		}
		var match = matchVersion(data);
		if (!match) {
			throw "cannot find version property in " + file;
		}
		if (match[1] == pkg.version) {
			console.log(file + "\t" + match[1] + " --> " + pkg.version + " no change");
			return;
		}
		data = data.substring(0, match.index + match[0].length - match[1].length) + pkg.version + data.substring(match.index + match[0].length);
		fs.writeFile(file, data, "utf8", function (err) {
			if (err) {
				throw err;
			}
			console.log(file + "\t" + match[1] + " --> " + pkg.version);
		});
	});
}
