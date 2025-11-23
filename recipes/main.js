// Import recipes data
import recipes from './recipes.mjs';

// Step 1 & 2: Random number functions
/**
 * Generate a random number between 0 and num-1
 * @param {number} num - Upper bound (exclusive)
 * @returns {number} Random whole number
 */
function random(num) {
    return Math.floor(Math.random() * num);
}

/**
 * Get a random entry from a list
 * @param {Array} list - Array to select from
 * @returns {*} Random entry from the list
 */
function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

// Step 3: Template functions for tags and ratings
/**
 * Generate HTML for tags
 * @param {Array} tags - Array of tag strings
 * @returns {string} HTML string for tags
 */
function tagsTemplate(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

/**
 * Generate HTML for star rating display
 * @param {number} rating - Rating value (0-5)
 * @returns {string} HTML string for rating display
 */
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    
    // Loop through 1-5 to create stars
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            // Filled star
            html += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else {
            // Empty star
            html += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
        }
    }
    
    html += '</span>';
    return html;
}

// Step 4: Main recipe template
/**
 * Generate HTML for a single recipe
 * @param {Object} recipe - Recipe object
 * @returns {string} HTML string for recipe card
 */
function recipeTemplate(recipe) {
    return `
        <article class="recipe">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <div class="recipe-content">
                <h2 class="recipe-name">${recipe.name}</h2>
                <div class="recipe-meta">
                    <span class="recipe-author">By ${recipe.author}</span>
                    ${ratingTemplate(recipe.rating)}
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-tags">
                    ${tagsTemplate(recipe.tags)}
                </div>
            </div>
        </article>
    `;
}

// Step 5: Render recipes to the page
/**
 * Display recipes on the page
 * @param {Array} recipeList - Array of recipe objects to display
 */
function renderRecipes(recipeList) {
    const recipesContainer = document.getElementById('recipes');
    
    if (recipeList.length === 0) {
        recipesContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">No recipes found. Try a different search term.</p>';
        return;
    }
    
    const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipesContainer.innerHTML = recipesHTML;
}

// Step 6: Filter recipes based on search query
/**
 * Filter recipes based on search query
 * @param {string} query - Search query string (should be lowercase)
 * @returns {Array} Filtered and sorted array of recipes
 */
function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
            recipe.author.toLowerCase().includes(query)
        );
    });
    
    // Sort alphabetically by name
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    return sorted;
}

// Step 7: Search handler
/**
 * Handle search form submission
 * @param {Event} event - Form submit event
 */
function searchHandler(event) {
    event.preventDefault();
    
    // Get the search input value and convert to lowercase
    const searchInput = document.getElementById('search');
    const query = searchInput.value.toLowerCase().trim();
    
    // Filter recipes based on query
    const filtered = filterRecipes(query);
    
    // Render the filtered list
    renderRecipes(filtered);
}

/**
 * Handle "View All / View Random" button toggle
 */
function toggleViewHandler() {
    const viewBtn = document.getElementById('viewAllBtn');
    const searchInput = document.getElementById('search');
    
    if (viewBtn.textContent === 'View All') {
        // Clear search input
        searchInput.value = '';
        
        // Display all recipes sorted alphabetically
        const sortedRecipes = [...recipes].sort((a, b) => a.name.localeCompare(b.name));
        renderRecipes(sortedRecipes);
        
        // Change button text to "View Random"
        viewBtn.textContent = 'View Random';
    } else {
        // Clear search input
        searchInput.value = '';
        
        // Display a random recipe
        const recipe = getRandomListEntry(recipes);
        renderRecipes([recipe]);
        
        // Change button text back to "View All"
        viewBtn.textContent = 'View All';
    }
}

// Step 8: Initialize the page
/**
 * Initialize the page - show random recipe and set up event listeners
 */
function init() {
    // Get and display a random recipe on page load
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
    
    // Set up search form event listener
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', searchHandler);
    
    // Set up toggle view button event listener
    const viewAllBtn = document.getElementById('viewAllBtn');
    viewAllBtn.addEventListener('click', toggleViewHandler);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);


