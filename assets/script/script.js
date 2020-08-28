//todo: add code here
var taskText;
var tasks = {};
var currrentDay = moment().format("dddd, MMMM Do YYYY, h:mm a");

//add a new task
$(".col-8").on("click","p", function(){
    var text = $(this).text().trim();
    var textP = $("<textarea>")
    .addClass("textInput")
    .text(text);
    $(this).replaceWith(textP);
    textP.trigger("focus");

});

$(".col-8").on("blur", "textarea", function(){
    var text = $(this).val().trim();
    console.log(text);
    var par = $("<p>")
    .addClass("m-1")
    .text(text);

    $(this).replaceWith(par);
});


//if nothing in local storage, create emptry array
var loadTasks = function() {
     //set the current date
     var welcomeText = document.querySelector("#currentDay");
     var text = welcomeText.textContent;
     text += " " + currrentDay;
     $(welcomeText).text(text);
     console.log(text);
    tasks = JSON.parse(localStorage.getItem("appointments"));
    //if there's nothing there, don't worry about it
    if(!tasks) {
       return false;
    }
    else {
    //loop over the tasks and load them
    $.each(tasks, function (list, taskText) {
        var par = $(list).find("p");
        par.text(taskText);
        //loop over the object
     });
    }
};

//on click on save button, add id and text to tasks object
$(".row").on("click",".saveBtn", function() {
    var key = $(this).parent().attr("id");
    console.log(key);
    key = String(key);
    key = "#" + key;

    //first, find the saveBtn's parent node id
    var taskP = $(key).find("p");
    console.log(taskP.text());
    tasks[key] =taskP.text();
    console.log(tasks);
    localStorage.setItem("appointments", JSON.stringify(tasks));

} );

//allow them to edit the text by turning the p into a textarea
$(".taskInput").on("click", "p", function() {
    var text = $(this).text().trim();
    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

//change background of task column depending on the hour of the day
//get current hour
var setHour = function() {
    //get the current hour

  //var currentHour = moment().hours();
   var currentHour = 10;
   for(var i = 8; i<18; i++) {
       var string = String(i);
       var div = $("#" + string).find("#textDiv");
    if(i===currentHour) {
        div.addClass("present");
    }
    else if(i < currentHour) {
        div.addClass("past");
    }
    else{
        div.addClass("future");
    }
   }
};

//loadTasks
loadTasks();
setHour();