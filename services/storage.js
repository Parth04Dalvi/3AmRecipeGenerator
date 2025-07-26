// --- Storage Service (src/services/storage.js) ---
const FAVORITES_KEY = '@RecipeApp:favorites';
const SHOPPING_LIST_KEY = '@RecipeApp:shoppingList';

/**
 * Loads favorite recipes from AsyncStorage.
 * @returns {Promise<Array>} - A promise that resolves to an array of favorite recipes.
 */
const loadFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading favorites:', e);
    return [];
  }
};

/**
 * Saves favorite recipes to AsyncStorage.
 * @param {Array} favorites - The array of favorite recipes to save.
 */
const saveFavorites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving favorites:', e);
  }
};

/**
 * Loads the shopping list from AsyncStorage.
 * @returns {Promise<Array>} - A promise that resolves to an array of shopping list items.
 */
const loadShoppingList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading shopping list:', e);
    return [];
  }
};

/**
 * Saves the shopping list to AsyncStorage.
 * @param {Array} shoppingList - The array of shopping list items to save.
 */
const saveShoppingList = async (shoppingList) => {
  try {
    const jsonValue = JSON.stringify(shoppingList);
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving shopping list:', e);
  }
};