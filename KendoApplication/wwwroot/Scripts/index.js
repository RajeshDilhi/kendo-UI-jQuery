$(document).ready(function () {
    
    var data;
    $.ajax({
        url: 'https://jonasjacek.github.io/colors/data.json',
        dataType: "json",
        async: false,
        success: function (res) {
            data = res;// I can se data but I need outside ajax call
        }, error: function (err) {
                console.log(err);
            }
    });

    $("#colors").kendoAutoComplete({
        dataTextField: "name",
        dataSource: data,
        filter: "startswith",
        placeholder: "Select country...",
        select: preview,
        });


    function preview(e) {
        if (e.value === undefined) {
            $("#background").css("background-color", e.dataItem.hexString);
        } else {
            $("#background").css("background-color", e.value);
        }
    }

    $("#palette").kendoColorPalette({
        columns: 4,
        tileSize: {
            width: 34,
            height: 19
        },
        palette: [
            "#f0d0c9", "#e2a293", "#d4735e", "#65281a",
            "#eddfda", "#dcc0b6", "#cba092", "#7b4b3a",
            "#fcecd5", "#f9d9ab", "#f6c781", "#c87d0e",
            "#e1dca5", "#d0c974", "#a29a36", "#514d1b",
            "#c6d9f0", "#8db3e2", "#548dd4", "#17365d"
        ],
        change: preview
    });

    $("#picker").kendoColorPicker({
        value: "#ffffff",
        buttons: false,
        select: preview
    });
     
});



