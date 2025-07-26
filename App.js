// App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// --- Main App Component (App.js) ---
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('RecipeSearch');
  const [routeParams, setRouteParams] = useState({});

  const navigateTo = (screenName, params = {}) => {
    setCurrentScreen(screenName);
    setRouteParams(params);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'RecipeSearch':
        return <RecipeSearchScreen navigateTo={navigateTo} />;
      case 'RecipeDetail':
        return <RecipeDetailScreen route={{ params: routeParams }} navigateTo={navigateTo} />;
      case 'Favorites':
        return <FavoritesScreen navigateTo={navigateTo} />;
      case 'ShoppingList':
        return <ShoppingListScreen navigateTo={navigateTo} />;
      default:
        return <RecipeSearchScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <AppStateProvider>
      <View style={styles.appContainer}>
        {renderScreen()}
        <View style={styles.navigationBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateTo('RecipeSearch')}
          >
            <Text style={styles.navButtonText}>🔍 Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateTo('Favorites')}
          >
            <Text style={styles.navButtonText}>❤️ Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateTo('ShoppingList')}
          >
            <Text style={styles.navButtonText}>🛒 Shopping List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppStateProvider>
  );
};
// --- Styles ---
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF6347',
  },
  navButtonText: {
    color: '#FF6347',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

const componentStyles = StyleSheet.create({
  // RecipeCard Styles
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  recipeCardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  recipeCardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  recipeCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  favoriteButtonText: {
    fontSize: 24,
  },

  // LoadingIndicator Styles (shared with App.js for initial load)
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },

  // MessageBox Styles
  messageBoxOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  messageBoxContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxWidth: 300,
  },
  messageBoxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  messageBoxMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  messageBoxButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  messageBoxButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContentContainer: {
    paddingBottom: 20, // Give some space at the bottom of the list
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#D32F2F',
    paddingHorizontal: 20,
  },

  // RecipeDetailScreen Styles
  detailScrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  detailHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  detailImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50', // Green for actions
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ShoppingListScreen Styles
  shoppingListInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  shoppingListInput: {
    flex: 1,
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  shoppingListAddButton: {
    marginLeft: 10,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  shoppingListAddButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shoppingListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shoppingItemCheckbox: {
    marginRight: 10,
    padding: 5,
  },
  checkedText: {
    fontSize: 20,
    color: '#4CAF50', // Green for checked
  },
  uncheckedText: {
    fontSize: 20,
    color: '#777',
  },
  shoppingItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  shoppingItemTextChecked: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  shoppingItemRemoveButton: {
    fontSize: 20,
    color: '#D32F2F', // Red for remove
    marginLeft: 10,
    padding: 5,
  },
  clearListButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  clearListButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;