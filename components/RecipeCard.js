// --- Components (src/components/RecipeCard.js) ---
const RecipeCard = ({ recipe, onPress, onToggleFavorite, isFavorite }) => {
  return (
    <TouchableOpacity style={componentStyles.recipeCard} onPress={() => onPress(recipe)}>
      <Image
        source={{ uri: recipe.image || 'https://placehold.co/150x150/cccccc/333333?text=No+Image' }}
        style={componentStyles.recipeCardImage}
      />
      <View style={componentStyles.recipeCardContent}>
        <Text style={componentStyles.recipeCardTitle} numberOfLines={2}>
          {recipe.title}
        </Text>
        <TouchableOpacity
          style={componentStyles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation(); // Prevent card press when pressing favorite button
            onToggleFavorite(recipe);
          }}
        >
          <Text style={componentStyles.favoriteButtonText}>
            {isFavorite ? '❤️' : '�'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};