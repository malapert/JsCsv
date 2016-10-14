var requirejs = require('requirejs');
requirejs.config({
    baseUrl: 'node_modules/requirejs/',
    nodeRequire: require
});
var assert = require('chai').assert;
var JsCsv = requirejs("../../app/JsCsv");

describe("Checking parsing", function () {

   it("it parses a CSV", function () {
       var csvData='# 1st line is the header\nID,RA,DEC,VAL1,VAL2\nID1,3.566,12.444,VAL1,VAL2\nID2,33.23,34.4,VAL11,VAL21\n';
       var csvHeader= {
           "name":["ID","RA","DEC","VAL1","VAL2"],
           "datatype":["string","double","double","string","string"]
       };
       var csv = new JsCsv.Csv(csvData,',',csvHeader);
       var store = csv.getStore();
       assert.equal(store[1]["ID"],"ID2");
       assert.equal(store[1]["DEC"],34.4);
   });
});
