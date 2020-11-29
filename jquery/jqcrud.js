$(function(){
    // setInterval( () => {
    //     loadRecipies();
    // }, 2000);
    loadRecipies();
    $("#recipies").on("click", ".btn-danger", handleDelete);
    $("#recipies").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addRecipe);
    $("#updateSave").click(function(){
        var id = $("#updateId").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
            data: {title, body},
            method: "PUT",
            success: function(response){
                console.log(response);
                loadRecipies();
                $("#updateModal").modal("hide");
            }
        });
    });
});
function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id, function(response){
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");
    });
}
function addRecipe(){
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data: { title, body},
        success: function(response){
            console.log(response);
            loadRecipies();
            var title = $("#title").val(" ");
            var body = $("#body").val(" ");
            $("#addModal").modal("hide");
        }
    });
}
function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log("Handle Delete");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method: "DELETE",
        success: function(response){
            console.log(response);
            loadRecipies();
        }
    });
}
function loadRecipies(){
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        error: function(){
            var recipies = $("#recipies");
            recipies.html("An Error has ocurred");     
        },
        success: function(response){
            console.log(response);
            var recipies = $("#recipies");
            recipies.empty();
            for(var i = 0; i < response.length; i++){
                var res = response[i];
                recipies.append(`<div class="recipe" data-id="${res._id}"><h3>${res.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">edit</button>${res.body}</p></div>`);
            }
        }
    });
}