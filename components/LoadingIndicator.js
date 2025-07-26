// --- Components (src/components/LoadingIndicator.js) ---
const LoadingIndicator = () => (
  <View style={componentStyles.loadingContainer}>
    <ActivityIndicator size="large" color="#FF6347" />
    <Text style={componentStyles.loadingText}>Loading...</Text>
  </View>
);