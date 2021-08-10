$(() => {

    $("#submit").submit(() => {
        const data = {
            question: $("#quest").val(),
        };
        $.post({
            url: "/8ball",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
        }).done(resp => {
            console.log("server response: " + resp);
            $("#quest").val(resp);
            $("#quest").focus(function () {
                $(this).select();
            });
        })
        return false;
    });

});