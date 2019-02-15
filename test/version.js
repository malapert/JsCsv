var requirejs = require('requirejs');
requirejs.config({
    baseUrl: 'node_modules/requirejs/',
    nodeRequire: require
});
var assert = require('chai').assert;
var JsCsv = requirejs("../../app/JsCsv");

describe("Checking version", function () {

   it("it checks the version", function () {
   	assert.equal(JsCsv.version,"1.1.3");
   });
});
