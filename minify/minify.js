({
	baseUrl: "../app",	
	name: "JsCsv",
	include: ["JsCsv"],
	insertRequire: ["JsCsv"],
	out: "../JsCsv.min.js",	
	optimize: "uglify2",
	wrap: {
		startFile: "wrap.start",
		endFile: "wrap.end"
	},
	paths: {
		"JsCsv": "JsCsv"
	},
	uglify2: {
		//Example of a specialized config. If you are fine
		//with the default options, no need to specify
		//any of these properties.
		output: {
			beautify: false
		},
		compress: {
			unsafe: true,
		},
		warnings: true,
		mangle: true
	},

})
