// Find the button and paragraph
const button = document.getElementById("myButton");
const message = document.getElementById("message");

// Change the text when the button is clicked
button.addEventListener("click", function() {
    message.textContent = "You clicked the button!";
});
