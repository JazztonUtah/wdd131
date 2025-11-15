// Import recipes data
import recipes from './recipes.mjs';

/**
 * Generate HTML for star rating display
 * @param {number} rating - Rating value (0-5)
 * @returns {string} HTML string for rating display
 */
function generateRatingHTML(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    
    let starsHTML = '';
    
    // Add filled stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span aria-hidden="true" class="icon-star">⭐</span>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
    }
    
    return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">${starsHTML}</span>`;
}

/**
 * Generate HTML for tags
 * @param {Array} tags - Array of tag strings
 * @returns {string} HTML string for tags
 */
function generateTagsHTML(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

/**
 * Generate HTML for a single recipe
 * @param {Object} recipe - Recipe object
 * @returns {string} HTML string for recipe card
 */
function generateRecipeHTML(recipe) {
    return `
        <article class="recipe">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <div class="recipe-content">
                <h2 class="recipe-name">${recipe.name}</h2>
                <div class="recipe-meta">
                    <span class="recipe-author">By ${recipe.author}</span>
                    ${generateRatingHTML(recipe.rating)}
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-tags">
                    ${generateTagsHTML(recipe.tags)}
                </div>
            </div>
        </article>
    `;
}

/**
 * Display recipes on the page
 * @param {Array} recipesToDisplay - Array of recipe objects to display
 */
function displayRecipes(recipesToDisplay) {
    const recipesContainer = document.getElementById('recipes');
    
    if (recipesToDisplay.length === 0) {
        recipesContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">No recipes found. Try a different search term.</p>';
        return;
    }
    
    const recipesHTML = recipesToDisplay.map(recipe => generateRecipeHTML(recipe)).join('');
    recipesContainer.innerHTML = recipesHTML;
}

/**
 * Filter recipes based on search query
 * @param {string} query - Search query string
 * @returns {Array} Filtered array of recipes
 */
function filterRecipes(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === '') {
        return recipes;
    }
    
    return recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            recipe.author.toLowerCase().includes(searchTerm)
        );
    });
}

/**
 * Handle search form submission
 * @param {Event} event - Form submit event
 */
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search');
    const query = searchInput.value;
    const filteredRecipes = filterRecipes(query);
    displayRecipes(filteredRecipes);
}

/**
 * Initialize the page
 */
function init() {
    // Display all recipes on page load
    displayRecipes(recipes);
    
    // Set up search form event listener
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearch);
    
    // Optional: Real-time search as user types
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        const filteredRecipes = filterRecipes(query);
        displayRecipes(filteredRecipes);
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);


