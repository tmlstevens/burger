$(function() {
    $(".update-sandwich").on("click", function(event) {
        var id = $(this).data("id");
        var devouredState = $(this).data("devoured");
        var newDevouredState = {
            devoured: !devouredState
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        })
        .then(function() {
            console.log("changed devoured to", newDevouredState);
            location.reload();
        })
    });

    $(".create").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            sandwich: $("#sandwich_description").val(), //.trim(),
            devoured: 0
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        })
        .then(function() {
            console.log("created new burger");
            location.reload();
        })
    });

    $(".delete-sandwich").on("click", function(event) {
        var id = $(this).data("id");
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        })
        .then(function() {
            console.log("deleted sandwich", id);
            location.reload();
        })
    })
});
  