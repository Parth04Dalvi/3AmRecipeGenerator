// --- App Context (src/context/AppContext.js) ---
const AppContext = createContext();

const AppStateProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Load initial data from AsyncStorage
    const initializeData = async () => {
      const loadedFavorites = await loadFavorites();
      setFavorites(loadedFavorites);
      const loadedShoppingList = await loadShoppingList();
      setShoppingList(loadedShoppingList);
      setIsAppReady(true);
    };
    initializeData();
  }, []);

  useEffect(() => {
    // Save favorites whenever the state changes
    if (isAppReady) {
      saveFavorites(favorites);
    }
  }, [favorites, isAppReady]);

  useEffect(() => {
    // Save shopping list whenever the state changes
    if (isAppReady) {
      saveShoppingList(shoppingList);
    }
  }, [shoppingList, isAppReady]);

  /**
   * Adds a recipe to favorites.
   * @param {object} recipe - The recipe object to add.
   */
  const addFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === recipe.id)) {
        return [...prevFavorites, recipe];
      }
      return prevFavorites;
    });
  };

  /**
   * Removes a recipe from favorites.
   * @param {number} recipeId - The ID of the recipe to remove.
   */
  const removeFavorite = (recipeId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== recipeId));
  };

  /**
   * Checks if a recipe is in favorites.
   * @param {number} recipeId - The ID of the recipe to check.
   * @returns {boolean} - True if the recipe is a favorite, false otherwise.
   */
  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  /**
   * Adds ingredients to the shopping list.
   * @param {Array<string>} ingredients - An array of ingredient strings to add.
   */
  const addIngredientsToShoppingList = (ingredients) => {
    setShoppingList((prevList) => {
      const newItems = ingredients.map((item) => ({
        id: `${item}-${Date.now()}-${Math.random()}`, // Unique ID for each item
        text: item,
        checked: false,
      }));
      return [...prevList, ...newItems];
    });
  };

  /**
   * Toggles the checked status of a shopping list item.
   * @param {string} itemId - The ID of the item to toggle.
   */
  const toggleShoppingListItem = (itemId) => {
    setShoppingList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  /**
   * Removes a shopping list item.
   * @param {string} itemId - The ID of the item to remove.
   */
  const removeShoppingListItem = (itemId) => {
    setShoppingList((prevList) => prevList.filter((item) => item.id !== itemId));
  };

  /**
   * Adds a custom item to the shopping list.
   * @param {string} itemText - The text of the custom item.
   */
  const addCustomShoppingListItem = (itemText) => {
    if (itemText.trim()) {
      setShoppingList((prevList) => [
        ...prevList,
        { id: `${itemText}-${Date.now()}`, text: itemText.trim(), checked: false },
      ]);
    }
  };

  /**
   * Clears all items from the shopping list.
   */
  const clearShoppingList = () => {
    setShoppingList([]);
  };

  if (!isAppReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={styles.loadingText}>Loading app data...</Text>
      </View>
    );
  }

  return (
    <AppContext.Provider
      value={{
        favorites,
        shoppingList,
        addFavorite,
        removeFavorite,
        isFavorite,
        addIngredientsToShoppingList,
        toggleShoppingListItem,
        removeShoppingListItem,
        addCustomShoppingListItem,
        clearShoppingList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};