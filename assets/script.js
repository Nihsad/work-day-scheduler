$(document).ready(function () {
  // get the current date
  var currentDate = dayjs().format("dddd, MMMM DD");

  // set the value of the #currentDay div to the current date
  $("#currentDay").text(currentDate);

  // container for time blocks
  var timeBlocksContainer = $(".container-lg");

  // generate hour blocks dynamically
  for (var hour = 9; hour <= 17; hour++) {
    // create a unique id for each time block
    var timeBlockId = "hour-" + hour;

    // determine AM or PM
    var amPm = hour < 12 ? "AM" : "PM";

    // convert to 12-hour format
    var displayHour = hour <= 12 ? hour : hour - 12;

    // create the HTML structure for the time block
    var timeBlockHtml =
      '<div id="' +
      timeBlockId +
      '" class="row time-block">' +
      '<div class="col-2 col-md-1 hour text-center py-3">' +
      displayHour +
      amPm +
      '</div>' +
      '<textarea class="col-8 col-md-10 description" rows="3"></textarea>' +
      '<button class="btn saveBtn col-2 col-md-1" aria-label="save">' +
      '<i class="fas fa-save" aria-hidden="true"></i>' +
      '</button>' +
      '</div>';

    // append the time block to the container
    timeBlocksContainer.append(timeBlockHtml);
  }

  // save button click listener
  $(".container").on("click", ".saveBtn", function () {
    // get the id of the timeblock containing the button that was clicked
    var timeBlockId = $(this).parent().attr("id");
    // get the user input from the textarea
    var userInput = $(this).siblings(".description").val();
    // save the user input in local storage using the id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // get the current hour
  var currentHour = dayjs().hour();

  // loop through each time block
  $(".time-block").each(function () {
    // get the id of the timeblock
    var timeBlockId = $(this).attr("id");
    // get the hour from the id (e.g. "hour-9" -> 9)
    var timeBlockHour = parseInt(timeBlockId.split("hour-")[1]);

    // determine if the time block is in the past, present, or future
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // on page load, set the values of the textarea elements with any user input that was saved in localStorage
  $(".description").each(function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    $(this).val(localStorage.getItem(timeBlockId));
  });
});