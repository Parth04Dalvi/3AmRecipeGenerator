// --- Screens (src/screens/FavoritesScreen.js) ---
const FavoritesScreen = ({ navigateTo }) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(AppContext);
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);
  const [messageBoxMessage, setMessageBoxMessage] = useState('');

  const handleToggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
      setMessageBoxMessage(`${recipe.title} removed from favorites!`);
    } else {
      addFavorite(recipe); // Should not happen in favorites screen but for consistency
      setMessageBoxMessage(`${recipe.title} added to favorites!`);
    }
    setMessageBoxVisible(true);
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <Text style={screenStyles.header}>My Favorites</Text>
      <FlatList
        data={favorites}
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
          <Text style={screenStyles.emptyListText}>No favorite recipes yet. Start by searching!</Text>
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