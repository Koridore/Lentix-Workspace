var {execSync: exec} = require("child_process"),
	assert = require("assert"),

	samples = ["sample.json", "sample.js", "sample.user.js"],
	pkg = require("./package.json");
	
samples.forEach(fn => {
	fn = "test/" + fn;
  assert.equal(
    exec(
        `node sync-version.js --list ${fn}`,
        {encoding: "utf8"}
    ),
    `Under sync-version\npackage.json\t${pkg.version}\n${fn}\t0.1.0\n`
  );
});
