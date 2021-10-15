window.addEventListener("load", () => {
    $('input:radio[name="discount"]').change(function() {
        console.log($(this).val())
        if ($(this).val() == "Percentuale") {
            $("#javascriptTiAmo").text("%");  
        } else {
            $("#javascriptTiAmo").text("€");
        }
    });
});