// --- Screens (src/screens/RecipeSearchScreen.js) ---
const RecipeSearchScreen = ({ navigateTo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useContext(AppContext);
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);
  const [messageBoxMessage, setMessageBoxMessage] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMessageBoxMessage('Please enter a search query.');
      setMessageBoxVisible(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
      setMessageBoxMessage(`${recipe.title} removed from favorites!`);
    } else {
      addFavorite(recipe);
      setMessageBoxMessage(`${recipe.title} added to favorites!`);
    }
    setMessageBoxVisible(true);
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <Text style={screenStyles.header}>Recipe Search</Text>
      <View style={screenStyles.searchContainer}>
        <TextInput
          style={screenStyles.searchInput}
          placeholder="Search for recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={screenStyles.searchButton} onPress={handleSearch}>
          <Text style={screenStyles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <LoadingIndicator />}
      {error && <Text style={screenStyles.errorText}>{error}</Text>}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigateTo('RecipeDetail', { recipeId: item.id, recipeTitle: item.title })}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          !loading && !error && recipes.length === 0 && searchQuery.length > 0 ? (
            <Text style={screenStyles.emptyListText}>No recipes found. Try a different search.</Text>
          ) : null
        }
        contentContainerStyle={screenStyles.listContentContainer}
      />
      <MessageBox
        visible={messageBoxVisible}
        message={messageBoxMessage}
        onClose={() => setMessageBoxVisible(false)}
      />
    </SafeAreaView>
  );
};