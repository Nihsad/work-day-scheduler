// Wait for the document to be fully loaded before executing the script
$(document).ready(function () {
  // Get the current date using the dayjs library
  var currentDate = dayjs().format("dddd, MMMM DD");

  // Set the current date in the #currentDay div
  $("#currentDay").text(currentDate);

  // Container for time blocks
  var timeBlocksContainer = $(".container-lg");

  // Generate hour blocks dynamically from 9 AM to 5 PM
  for (var hour = 9; hour <= 17; hour++) {
    // Create a unique id for each time block
    var timeBlockId = "hour-" + hour;

    // Determine whether it's AM or PM
    var amPm = hour < 12 ? "AM" : "PM";

    // Convert to 12-hour format
    var displayHour = hour <= 12 ? hour : hour - 12;

    // Create the HTML structure for the time block
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

    // Append the time block to the container
    timeBlocksContainer.append(timeBlockHtml);
  }

  // Save button click listener
  $(".container-lg").on("click", ".saveBtn", function () {
    // Get the id of the time block containing the clicked button
    var timeBlockId = $(this).parent().attr("id");

    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    console.log("Clicked save button");
    console.log("timeBlockId:", timeBlockId);
    console.log("userInput:", userInput);

    // Save the user input in local storage using the id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using dayjs
  var currentHour = dayjs().hour();

  // Loop through each time block to apply styling based on the current hour
  $(".time-block").each(function () {
    // Get the id of the time block
    var timeBlockId = $(this).attr("id");

    // Get the hour from the id (e.g., "hour-9" -> 9)
    var timeBlockHour = parseInt(timeBlockId.split("hour-")[1]);

    // Determine if the time block is in the past, present, or future
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // On page load, set the values of the textarea elements with any user input saved in localStorage
  $(".description").each(function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    if (timeBlockId) {
        $(this).val(localStorage.getItem(timeBlockId));
    }
});

});