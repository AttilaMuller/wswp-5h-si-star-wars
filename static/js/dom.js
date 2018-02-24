
let dom = {
    showTable: function(results) {
        $('#planets_table > tbody').html( util.getTable( results ));
        dom.eventHandlerToButtons();
        dom.clearDataFromModal();
        //dom.loadDataToModal();

    },

    animateShip: function (){
        $("#ship").animate({right: "+=500", top: "-=200"}, 300);
        $("#ship").animate({right: "+=2000", top: "+=600"}, 450);
    },

    eventHandlerToButtons: function() {
        $(".btn-info").click(function () {
            let planetUrl = $(this).attr("data-planet-name");
            $("#planet-modal").data("planetUrl", planetUrl);
            $.getJSON(planetUrl, function (data) {
                dom.showResidentTable(data.residents);
                $('#planet-modal').modal('show');
            });
        });
    },

    clearDataFromModal: function () {
        $("#close-modal").click(function () {
            $("#residents-table > tbody").html("");
        })
    },
    showResidentTable: function(residents) {
        $.each(residents, function (index, personUrl) {
            $.getJSON(personUrl, function (personArray) {
                let table = "";
                table += "<tr><td>" + personArray.name;
                table += "</td><td>" + personArray.height;
                table += "</td><td>" + personArray.mass;
                table += "</td><td>" + personArray.hair_color;
                table += "</td><td>" + personArray.skin_color;
                table += "</td><td>" + personArray.eye_color;
                table += "</td><td>" + personArray.birth_year;
                table += "</td><td>" + personArray.gender + "</td><tr/>";
                $("#residents-table > tbody").append(table);
            });
        });
    }
};