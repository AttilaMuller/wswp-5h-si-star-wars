$.getJSON('https://swapi.co/api/planets/?page=1', function(data){
    var table='';
        $( "#planets_table" ).data( "page", 1 );
        $.each( data.results, function( index, row){
          table += "<tr><td>" + row.name + "</td><td>" + row.diameter + "</td><td>" + row.climate +
              "</td><td>" + row.terrain + "</td><td>" + row.surface_water + "</td><td>"  + row.population +
              "</td><td>" + row.residents.length + "</td><td>" + " " + "</td></tr>"
        });
        $("#planets_table > tbody").html( table );
});


$( "#button_next" ).click(function() {
    if ($( "#planets_table" ).data("page") < 7) {
        var nextPageNumber = $("#planets_table").data("page") + 1;
        $( "#planets_table" ).data( "page", nextPageNumber );
        var nextPage = 'https://swapi.co/api/planets/?page=' + String(nextPageNumber);
        $.getJSON(nextPage, function(data){
        var table='';
          $.each( data.results, function( index, row){
              table += "<tr><td>" + row.name + "</td><td>" + row.diameter + "</td><td>" + row.climate +
                  "</td><td>" + row.terrain + "</td><td>" + row.surface_water + "</td><td>"  + row.population +
                  "</td><td>" + row.residents.length + "</td><td>" + " " + "</td></tr>"
          });
          $("#planets_table > tbody").html( table );
          });
    } else {
        alert("Reached maximum page number")
    }
});


$( "#button_previous" ).click(function() {
    if ($( "#planets_table" ).data("page") > 1) {
        var prevPageNumber = $( "#planets_table" ).data("page") - 1;
        $( "#planets_table" ).data( "page", prevPageNumber );
        var prevPage = 'https://swapi.co/api/planets/?page=' + String(prevPageNumber);
        $.getJSON(prevPage, function(data){
        var table='';
          $.each( data.results, function( index, row){
              table += "<tr><td>" + row.name + "</td><td>" + row.diameter + "</td><td>" + row.climate +
                  "</td><td>" + row.terrain + "</td><td>" + row.surface_water + "</td><td>"  + row.population +
                  "</td><td>" + row.residents.length + "</td><td>" + " " + "</td></tr>"
          });
          $("#planets_table > tbody").html( table );
          });
      } else {
        alert("Reached minimum page number")
    }
});