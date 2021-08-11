$(() => {

    $("#submit").submit(() => {
        const data = {
            id: $("#prodId").val(),
        };
        $.post({
            url: "/addToCart",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
        }).done(resp => {
            console.log("server response: " + resp);
            $("#quantity").text(resp.quantity);
        })
        return false;
    });

   
        $.post({
            url: "/addToCart",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
        }).done(resp => {
            console.log("server response: " + resp);
            $("#quantity").text(resp.quantity);
        }).always( resp)
    

});