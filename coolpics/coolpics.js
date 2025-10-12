// Get the menu button and menu elements
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

// Add event listener to toggle menu visibility
menuButton.addEventListener('click', function() {
  menu.classList.toggle('show');
});

// Function to handle window resize
function handleResize() {
  if (window.innerWidth > 700) {
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

// Viewer Template Function - returns HTML template for the modal
function viewerTemplate(pic, alt) {
  return `<img src="${pic}" alt="${alt}"><button class='close-viewer'>X</button>`;
}

// Target the gallery
const gallery = document.querySelector('.gallery');

// Function to handle gallery image clicks
function viewHandler(event) {
  // Find which image was clicked
  const clickedImage = event.target.closest('img');
  
  // If no image was clicked, return early
  if (!clickedImage) return;
  
  // Get the src and alt attributes
  const src = clickedImage.src;
  const alt = clickedImage.alt;
  
  // Create the full-size image source
  // Split at '-' and replace 'sm' with 'full'
  const fullSrc = src.split('-')[0] + '-full.jpeg';
  
  // Create the dialog element
  const dialog = document.createElement('dialog');
  
  // Use the viewerTemplate function to set the innerHTML
  dialog.innerHTML = viewerTemplate(fullSrc, alt);
  
  // Append dialog to the body
  document.body.appendChild(dialog);
  
  // Show the modal dialog
  dialog.showModal();
  
  // Add event listener to close button
  const closeButton = dialog.querySelector('.close-viewer');
  closeButton.addEventListener('click', function() {
    dialog.close();
    dialog.remove();
  });
  
  // Function to close modal when clicking outside the image
  dialog.addEventListener('click', function(event) {
    // Check if the click was on the dialog backdrop (not on the image or button)
    if (event.target === dialog) {
      dialog.close();
      dialog.remove();
    }
  });
}

// Add event listener to the gallery (event delegation)
gallery.addEventListener('click', viewHandler);
