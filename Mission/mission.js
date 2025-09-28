// Theme switching functionality

// Select the theme selector element from the DOM
const themeSelector = document.getElementById('theme-selector');

// Function to change theme based on selection
function changeTheme() {
    const selectedTheme = themeSelector.value;
    const body = document.body;
    const logo = document.querySelector('.logo');
    
    if (selectedTheme === 'dark') {
        // Add dark class to body and change logo to white version
        body.classList.add('dark');
        logo.src = 'byui-logo_white.png';
    } else {
        // Remove dark class from body and change logo to blue version
        body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp';
    }
}

// Add event listener for change event
themeSelector.addEventListener('change', changeTheme);
