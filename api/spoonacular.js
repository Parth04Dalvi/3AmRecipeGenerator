// --- API Service (src/api/spoonacular.js) ---
const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // REPLACE WITH YOUR ACTUAL API KEY
const BASE_URL = 'https://api.spoonacular.com';

/**
 * Searches for recipes based on a query and filters.
 * @param {string} query - The search query (e.g., "pasta").
 * @param {object} filters - Optional filters like diet, cuisine.
 * @returns {Promise<Array>} - A promise that resolves to an array of recipes.
 */
const searchRecipes = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      query: query,
      number: 10, // Limit results for demo
      addRecipeInformation: true, // Get more details in search results
      ...filters,
    }).toString();
    const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`);
    const data = await response.json();
    if (response.ok) {
      return data.results;
    } else {
      throw new Error(data.message || 'Failed to fetch recipes');
    }
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

/**
 * Gets detailed information for a specific recipe by ID.
 * @param {number} id - The ID of the recipe.
 * @returns {Promise<object>} - A promise that resolves to the recipe details.
 */
const getRecipeDetails = async (id) => {
  try {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      includeNutrition: true, // Include nutrition data
    }).toString();
    const response = await fetch(`${BASE_URL}/recipes/${id}/information?${params}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Failed to fetch recipe details');
    }
  } catch (error) {
    console.error(`Error fetching recipe details for ID ${id}:`, error);
    throw error;
  }
};