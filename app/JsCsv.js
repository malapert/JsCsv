/*******************************************************************************
 * Copyright 2016 - Jean-Christophe Malapert
 *
 * This file is part of JsCsv.
 *
 * JsCsv is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JsCsv is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JVotable.  If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/
define( ["./csv"], function(Csv) {

        var JsCsv = {};

        JsCsv.Csv = Csv;
        JsCsv.version = {
            major : 1,
            minor : 1,
            patch : 4,
            date : "2019-02-15",
            toString : function () {
                return this.major+ "." + this.minor + "." + this.patch;
            }
        };

        window.JsCsv = JsCsv;

        return JsCsv;
});
