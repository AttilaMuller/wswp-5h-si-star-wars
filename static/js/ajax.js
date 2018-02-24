
// load table

$( document ).ready(function() {
    $( '#planets_table' ).hide();
    //$.get("/session", function(data){
     //   if(data!=null){
    //        $('#signed-in').html( "Signed in as " + data );
  // }

//});
});


$.getJSON('https://swapi.co/api/planets/?page=1', function(data){
    dom.animateShip();

    $( '#planets_table' ).data( "page", 1 );

    dom.showTable(data.results);

    $( '#planets_table').show();
});


// add event listener to next
$( '#button_next' ).click(function() {

    if ($( '#planets_table' ).data("page") < 7) {
        $('#planets_table > tbody').html( "Loading..." );
        let nextPageNumber = $("#planets_table").data("page") + 1;
        $( '#planets_table' ).data( "page", nextPageNumber );
        let nextPage = 'https://swapi.co/api/planets/?page=' + String(nextPageNumber);

        $.getJSON(nextPage, function(data){
            dom.showTable(data.results);
        });

    } else {
        alert("Reached maximum page number")
    }
});


// add event listener to previous
$( '#button_previous' ).click(function() {

    if ($( '#planets_table' ).data("page") > 1) {
        $('#planets_table > tbody').html( "Loading..." );
        let prevPageNumber = $( "#planets_table" ).data("page") - 1;
        $( '#planets_table' ).data( "page", prevPageNumber );
        let prevPage = 'https://swapi.co/api/planets/?page=' + String(prevPageNumber);

        $.getJSON(prevPage, function(data){
            dom.showTable(data.results);
        });

      } else {
        alert("Reached minimum page number")
    }

});

