// Product array
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate select dropdown dynamically
const productSelect = document.getElementById("product");
products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.name;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

// Function to update review count
function updateReviewCount() {
  let reviewCount = localStorage.getItem('reviewCount');
  if (reviewCount === null) {
    reviewCount = 0;
  } else {
    reviewCount = parseInt(reviewCount);
  }
  reviewCount++;
  localStorage.setItem('reviewCount', reviewCount);
  console.log(`Review count: ${reviewCount}`);
  // Optionally, display the review count on the page
  document.getElementById("reviewCount").textContent = `Reviews completed: ${reviewCount}`;
}

// Assuming your form has an id 'reviewForm'
const reviewForm = document.getElementById("reviewForm");

// Check if the form exists before adding an event listener
if (reviewForm) {
  reviewForm.addEventListener("submit", function(event) {
    // Prevent default form submission behavior if needed
    // event.preventDefault();
    
    // Update review count on form submission
    updateReviewCount();
  });
}

// If you want to display the review count when the page loads
function displayReviewCount() {
  let reviewCount = localStorage.getItem('reviewCount');
  if (reviewCount !== null) {
    document.getElementById("reviewCount").textContent = `Reviews completed: ${reviewCount}`;
  }
}

// Call displayReviewCount when the page loads
document.addEventListener("DOMContentLoaded", displayReviewCount);

// Display last modified date in footer
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;
