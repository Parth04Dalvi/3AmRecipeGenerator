// --- Screens (src/screens/RecipeDetailScreen.js) ---
const RecipeDetailScreen = ({ route, navigateTo }) => {
  const { recipeId, recipeTitle } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite, addIngredientsToShoppingList } = useContext(AppContext);
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);
  const [messageBoxMessage, setMessageBoxMessage] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await getRecipeDetails(recipeId);
        setRecipe(details);
      } catch (err) {
        setError('Failed to load recipe details. Please check your internet connection or try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [recipeId]);

  const handleToggleFavorite = () => {
    if (recipe) {
      if (isFavorite(recipe.id)) {
        removeFavorite(recipe.id);
        setMessageBoxMessage(`${recipe.title} removed from favorites!`);
      } else {
        addFavorite(recipe);
        setMessageBoxMessage(`${recipe.title} added to favorites!`);
      }
      setMessageBoxVisible(true);
    }
  };

  const handleAddToShoppingList = () => {
    if (recipe && recipe.extendedIngredients) {
      const ingredients = recipe.extendedIngredients.map((ing) => ing.original);
      addIngredientsToShoppingList(ingredients);
      setMessageBoxMessage(`Ingredients for ${recipe.title} added to shopping list!`);
      setMessageBoxVisible(true);
    } else {
      setMessageBoxMessage('No ingredients to add to shopping list.');
      setMessageBoxVisible(true);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <View style={screenStyles.container}>
        <Text style={screenStyles.errorText}>{error}</Text>
        <TouchableOpacity style={screenStyles.backButton} onPress={() => navigateTo('RecipeSearch')}>
          <Text style={screenStyles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={screenStyles.container}>
        <Text style={screenStyles.emptyListText}>Recipe not found.</Text>
        <TouchableOpacity style={screenStyles.backButton} onPress={() => navigateTo('RecipeSearch')}>
          <Text style={screenStyles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={screenStyles.container}>
      <ScrollView contentContainerStyle={screenStyles.detailScrollViewContent}>
        <Text style={screenStyles.detailHeader}>{recipe.title}</Text>
        <Image
          source={{ uri: recipe.image || 'https://placehold.co/300x200/cccccc/333333?text=No+Image' }}
          style={screenStyles.detailImage}
        />

        <View style={screenStyles.detailActions}>
          <TouchableOpacity
            style={screenStyles.actionButton}
            onPress={handleToggleFavorite}
          >
            <Text style={screenStyles.actionButtonText}>
              {isFavorite(recipe.id) ? 'Remove from Favorites ❤️' : 'Add to Favorites 🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={screenStyles.actionButton}
            onPress={handleAddToShoppingList}
          >
            <Text style={screenStyles.actionButtonText}>Add to Shopping List 🛒</Text>
          </TouchableOpacity>
        </View>

        <Text style={screenStyles.sectionTitle}>Summary</Text>
        <Text style={screenStyles.detailText}>
          {recipe.summary ? recipe.summary.replace(/<[^>]*>/g, '') : 'No summary available.'}
        </Text>

        <Text style={screenStyles.sectionTitle}>Ingredients</Text>
        {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
          recipe.extendedIngredients.map((ingredient, index) => (
            <Text key={index} style={screenStyles.listItem}>
              • {ingredient.original}
            </Text>
          ))
        ) : (
          <Text style={screenStyles.detailText}>No ingredients listed.</Text>
        )}

        <Text style={screenStyles.sectionTitle}>Instructions</Text>
        {recipe.instructions ? (
          <Text style={screenStyles.detailText}>
            {recipe.instructions.replace(/<[^>]*>/g, '')}
          </Text>
        ) : (
          <Text style={screenStyles.detailText}>No instructions available.</Text>
        )}

        {recipe.readyInMinutes && (
          <Text style={screenStyles.detailText}>
            <Text style={screenStyles.boldText}>Ready in:</Text> {recipe.readyInMinutes} minutes
          </Text>
        )}
        {recipe.servings && (
          <Text style={screenStyles.detailText}>
            <Text style={screenStyles.boldText}>Servings:</Text> {recipe.servings}
          </Text>
        )}
      </ScrollView>
      <MessageBox
        visible={messageBoxVisible}
        message={messageBoxMessage}
        onClose={() => setMessageBoxVisible(false)}
      />
    </SafeAreaView>
  );
};