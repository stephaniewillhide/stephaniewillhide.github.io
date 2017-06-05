// switch functions for the themes

function switchCute() {
  $('body').attr('class', 'cute-class');
}

function switchPizza() {
  $('body').attr('class', 'pizza-class');
}

function switchNature() {
  $('body').attr('class', 'nature-class');
}

// wait for the page to load before event handlers

$(document).ready(function () {

// click functionality for switchers

  $('a').click(function(e) {
    e.preventDefault();
  });

  $('#cute').click(switchCute);

  $('#pizza').click(switchPizza);

  $('#nature').click(switchNature);

// navigation functionality

  $('#hamburger-menu').on('click', function(e){
    e.preventDefault();
    $('#sidebar-links').slideToggle();
    $(this).text(function(i, text){
      return text === "✕" ? "☰" : "✕";
    })
  });

// todo list with local storage

// setting variables at 0 to start

  var i = 0;
  var nextTaskNumber = 0;
  
// getting todos from localStorage, finding the highest task # (so that we do not delete todos when changing)

  for (i = 0; i < localStorage.length; i++) {
    var taskID = localStorage.key(i);
    $('#todos').append("<li id='" + taskID + "'>" + localStorage.getItem(taskID) + "</li>");

    if (parseInt(taskID.replace("task-", "")) > nextTaskNumber) {
      nextTaskNumber = parseInt(taskID.replace("task-", ""));
    }
  }

// assigning id to task, appending html with new task

   $('#todo-form').submit(function () {
    if ($('#todo-input').val() !== "") {
      var taskID = "task-" + (i + nextTaskNumber);
      var todoText = $('#todo-input').val();
      localStorage.setItem(taskID, todoText);
      $('#todos').append("<li class='task' id='" + taskID + "'>" + todoText + "</li>");
      var task = $('#' + taskID);
      $('#taskInput').val("");
      i++;
    }
    return false;
  });

// getting rid of one done todo

  $('#todos').on("click", "li", function (event) {
    taskID = $(this).attr('id');
    localStorage.removeItem(taskID);

    $(this).remove();
  });

// getting rid of all todos in one fell swoop (if the user confirms)!

  $('#clear-all').on('click', function (event){
    if (confirm("Are you sure?")) {
      localStorage.clear();
      $("#todos").empty();      
    }
  })
  
 });