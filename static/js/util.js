let util = {
    convertResidents: function(residentsLength, planetUrl) {
        let newValue = "No known residents";
        if (residentsLength < 1) {
        return newValue
        } else {
            newValue = "<button id=\"resident_button\" data-planet-name=" + planetUrl + " type=\"button\" class=\"btn btn-info\">" + residentsLength + " resident(s)";
            return newValue
        }

    },

    convertKmToLocale: function(number) {

        let returnNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (number == "unknown") {
            return number
        } else {
            return returnNumber + " km"
        }
    },

    convertPeopleToLocale: function(number) {

        let returnNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (number == "unknown") {
            return number
        } else {
            return returnNumber + " people";
        }
    },

    convertWaterPercentage: function(water) {
        if (water == "unknown") {
            return water
        } else {
            return water + "%"
        }
    },

    getTable: function(results) {
    let table = "";
    $.each( results, function( index, row){
          table += "<tr><td>" + row.name;
          table += "</td><td>" + util.convertKmToLocale(row.diameter);
          table += "</td><td>" + row.climate;
          table += "</td><td>" + row.terrain;
          table += "</td><td>" + util.convertWaterPercentage(row.surface_water);
          table += "</td><td>"  + util.convertPeopleToLocale(row.population);
          table += "</td><td>" + util.convertResidents(row.residents.length, row.url);
          table += "</td><td>" + " " + "</td></tr>";
        });
    return table;
    }
};

