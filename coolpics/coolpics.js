// Get the menu button and menu elements
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

// Add event listener to toggle menu visibility
menuButton.addEventListener('click', function() {
  menu.classList.toggle('show');
});

// Function to handle window resize
function handleResize() {
  if (window.innerWidth > 1000) {
    // Remove the show class on larger screens (CSS will handle visibility)
    menu.classList.remove('show');
  } else {
    // On mobile, remove the show class to hide the menu by default
    menu.classList.remove('show');
  }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);

// Call handleResize immediately when page loads
handleResize();

// Image Viewer Modal functionality
function viewHandler(event) {
  // Get the clicked image element
  const clickedImage = event.target;
  
  // Get the src attribute - we'll use the full size image
  const imgSrc = clickedImage.src.split('-')[0] + '-full.jpeg';
  const imgAlt = clickedImage.alt;
  
  // Create the dialog element
  const dialog = document.createElement('dialog');
  
  // Set the innerHTML with the image and close button
  dialog.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}"><button class='close-viewer'>X</button>`;
  
  // Append dialog to the body
  document.body.appendChild(dialog);
  
  // Show the modal dialog
  dialog.showModal();
  
  // Add event listener to close button
  const closeButton = dialog.querySelector('.close-viewer');
  closeButton.addEventListener('click', function() {
    dialog.close();
    dialog.remove(); // Remove the dialog from the DOM after closing
  });
  
  // Also allow clicking outside the image to close
  dialog.addEventListener('click', function(e) {
    if (e.target === dialog) {
      dialog.close();
      dialog.remove();
    }
  });
}

// Add click event listeners to all gallery images
const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(function(image) {
  image.addEventListener('click', viewHandler);
});

