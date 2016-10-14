require.config({
    paths: {
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    },
    waitSeconds: 0
});

/**
 * Mizar widget main
 */
require(["jquery","../app/JsCsv"], function($, JsCsv) {

    $('.button').on('click', function(e) {
        CsvWidget.do_work('myWidget');
        e.preventDefault();
    });

    var CsvWidget = (function(){
        var self = {};

        self.do_work = function(div) {
            var csv = document.getElementById("csv").value;
            var header = document.getElementById("header").value;
            var headerKey = header.split(document.getElementById("separator").value);
            var headerInfo = {};
            headerInfo["name"] = [];
            headerInfo["datatype"]=[];
            for (var i=0;i<headerKey.length;i++) {
                var name = headerKey[i].substring(0,headerKey[i].indexOf('('));
                var value = headerKey[i].substring(headerKey[i].indexOf('(')+1,headerKey[i].indexOf(')'));
                headerInfo["name"].push(name);
                headerInfo["datatype"].push(value);
            }
            var csv = new JsCsv.Csv(csv, document.getElementById("separator").value, headerInfo);
            var output = csv.getGeoJSon({RA:"RA",DEC:"DEC",ID:"ID"});
            output = JSON.stringify(output, null, true);
            document.getElementById(div).innerHTML=output;
        };
        return self;
    })();


});
