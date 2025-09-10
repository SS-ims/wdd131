// Get the last modified date of the document
let modifiedDate = new Date(document.lastModified);

// Format the date nicely
let options = { year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit' };
let formattedDate = modifiedDate.toLocaleDateString("en-US", options);

// Display in the paragraph with id="lastModified"
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("lastModified").textContent =
    "This page was last modified on: " + formattedDate;
});
