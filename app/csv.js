define(function () {
    var PREFIX_COMMENT = '#';

    /**
     * Creates a CSV object based on CSV data, common separator such as '\t' and the headerInfo.
     *
     * @param {String} csv data
     * @param {String} commonSeparator the common separtor value such as \t
     * @param {{name: string[], datatype: string[]}} headerInfo
     * @constructor
     */
    var Csv = function (csv, commonSeparator, headerInfo) {
        checkInputFormat(csv);
        this.store = parseCSV(csv,commonSeparator,headerInfo)
    };

    /**
     * Checks input format.
     * @param {string} csv
     */
    function checkInputFormat(csv) {
        if (csv == null) {
            throw new Error("csv cannot be null");
        } else if (typeof csv !== "string") {
            throw new Error("This object is not supported");
        } else {
            // everything is fine
        }
    }

    /**
     * Parses a CSV file.
     * @param {string} csv the data
     * @param {string} commonSeparator the separator
     * @param {{name: string[], datatype: string[]}} headerInfo headerInfo
     * @return {*}
     */
    function parseCSV(csv, commonSeparator, headerInfo) {
        var rows = csv.split("\n");
        var lineWithData = 0;
        for (var i = 0; i < rows.length && isUselessRow(rows[i],commonSeparator, headerInfo.name); i++) {
            lineWithData++
        }
        return parseRows(rows, lineWithData, commonSeparator, headerInfo);

    }

    /**
     * Detects the no line data.
     * @param {string} row the line
     * @param {string}commonSeparator the separator
     * @param {string[]} headerName headerName
     * @return {boolean} True if no data otherwise False
     */
    function isUselessRow(row,commonSeparator,headerName) {
        return (row.startsWith(PREFIX_COMMENT) || row.length == 0 || headerName.toString() == row.split(commonSeparator).toString());
    }

    /**
     * Parses lines.
     * @param {string[]} rows the lines to parse
     * @param {string} lineWithData the line to start (after the comments and header)
     * @param {string} commonSeparator separator
     * @param {{name: string[], datatype: string[]}} headerInfo headerInfo
     * @return {Array.<{name:string}>} the parsed lines
     */
    function parseRows(rows, lineWithData, commonSeparator, headerInfo) {
        var store = [];
        for (var i=lineWithData; i<rows.length && rows[i].length!=0; i++) {
            store.push(parseRow(rows[i], commonSeparator, headerInfo));
        }
        return store;
    }

    /**
     * Parses a line.
     * @param {string} row the line
     * @param {string} commonSeparator the separator
     * @param {{name: string[], datatype: string[]}} headerInfo headerInfo
     * @return {Array.<{name:string}>} each keyword/value in a hash
     */
    function parseRow(row, commonSeparator, headerInfo) {
        var store = {};
        var tds = row.split(commonSeparator);
        for(var i=0; i<tds.length; i++) {
            store[headerInfo.name[i]] = parseDatatype(tds[i], headerInfo.datatype[i]);
        }
        return store;
    }

    /**
     * Transforms the value as string or a number
     * @param value the value to transform
     * @param type the datatype of the value
     * @return {string|number} the value
     */
    function parseDatatype(value, type) {
        var result;
        switch (type) {
            case "short":
            case "int":
            case "long":
                result = Number.parseInt(value);
                break;
            case "float":
            case "double":
                result = Number.parseFloat(value);
                break;
            default:
                result = value;
        }
        return result;
    }

    /**
     * Returns the parsed lines.
     * @return {Array.<{name:string}>} the parsed lines
     */
    Csv.prototype.getStore = function() {
        return this.store;
    };

    /**
     * Transforms the parsed lines into GeoJSON.
     * @param mapping
     * @param frame coordinate reference frame
     * @return {{type: string, id:string, features: Array}}
     */
    Csv.prototype.getGeoJSon = function(mapping, frame) {
      var RA = mapping.RA;
      var DEC = mapping.DEC;
      var ID = mapping.ID;
      //var CRS_NAME = mapping.CRS_NAME;
      var features = [];
      for(var i=0; i<this.store.length; i++) {

          var feature = {
              "type":"Feature",
              "id":this.store[i][ID],
              "geometry":{
                  "type":"Point",
                  "coordinates":[
                      this.store[i][RA],this.store[i][DEC]
                  ]
              },
              "crs":{
                  "type": "name",
                  "properties": {
                      "name": frame
                  }
              }
          };
          var newStore = JSON.parse(JSON.stringify(this.store[i]));
          delete newStore[RA];
          delete newStore[DEC];
          delete newStore[ID];
          feature["properties"] = newStore;

          features.push(feature);
      }
      var featureCollection = {
          "type": "FeatureCollection",
          "features":features
      };
      return featureCollection;
    };


    return Csv;

});