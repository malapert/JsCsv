require.config({
    baseUrl: "../app",
    name: "JsCsv",
    include: ["JsCsv"],
    insertRequire: ["JsCsv"],
    out: "../JsCsv.min.js",
    optimize: "none",
    paths: {
        "JsCsv": "JsCsv"            
    }	
});
