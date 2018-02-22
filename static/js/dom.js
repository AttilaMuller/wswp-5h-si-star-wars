
let dom = {
    showTable: function(results) {
        $('#planets_table > tbody').html( util.getTable( results ));
        dom.eventHandlerToButtons();

    },

    animateShip: function (){
        $("#ship").animate({right: "+=500", top: "-=200"}, 300);
        $("#ship").animate({right: "+=2000", top: "+=600"}, 450);
    },

    eventHandlerToButtons: function(){
        $( "#resident_button" ).click(function() {
        $('#planet-modal').modal('show');
        });
    }
};