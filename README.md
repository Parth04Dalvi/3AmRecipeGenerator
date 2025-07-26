# 3AmRecipeGenerator
Recipe Finder &amp; Cookbook App A cross-platform mobile application built with React Native that allows users to search for recipes, save their favorites for offline access, and generate shopping lists from recipe ingredients. This project demonstrates API integration, local data persistence, and a clean user interface.
Features
Recipe Search: Discover recipes by keyword, leveraging the Spoonacular API's vast database.

Recipe Details: View comprehensive information for each recipe, including ingredients, step-by-step instructions, preparation time, and serving size.

Favorite Recipes: Save your preferred recipes locally for quick access, even when offline.

Shopping List Generator: Automatically create a consolidated shopping list from the ingredients of selected recipes.

Custom Shopping List Items: Manually add or remove items from your shopping list.

Offline Access: Favorited recipes and shopping lists are stored on the device, ensuring availability without an internet connection.

Intuitive Navigation: Easy switching between search, favorites, and shopping list screens.

Technologies Used
React Native: For building native mobile applications using JavaScript and React.

Spoonacular API: The primary data source for fetching recipe information.

@react-native-async-storage/async-storage: For local, persistent key-value storage, enabling offline capabilities.

React Context API: For efficient state management across the application.

fetch API: For making HTTP requests to the Spoonacular API.

Setup and Running the Project
To get this project up and running on your local machine, follow these steps:

Clone the repository

Install dependencies:

npm install
# or yarn install

Also, install AsyncStorage:

npm install @react-native-async-storage/async-storage
# or yarn add @react-native-async-storage/async-storage

If you're targeting iOS, navigate to the ios directory and install pods:

cd ios && pod install && cd ..

Obtain a Spoonacular API Key:

Go to https://spoonacular.com/food-api/console and sign up for a free account to get your API key.

Configure API Key:

Open the App.js file (or src/api/spoonacular.js if you refactor it into separate files).

Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key:

const SPOONACULAR_API_KEY = 'YOUR_ACTUAL_SPOONACULAR_API_KEY';

Run the application:

For iOS:

npx react-native run-ios

For Android:

npx react-native run-android

Future Improvements
Advanced Local Database: Migrate from AsyncStorage to a more robust local database like SQLite (react-native-sqlite-storage) or Realm for more complex data querying and relationships.

Network Connectivity Handling: Implement a more sophisticated network status checker (@react-native-community/netinfo) to provide real-time feedback and better offline synchronization.

User Authentication: Add user login/registration to personalize favorites and shopping lists across multiple devices using a backend like Firebase.

Image Caching: Optimize image loading and reduce network requests with an image caching library.

UI/UX Enhancements: Introduce more animations, custom icons, and refined layouts for a polished user experience.

Pagination/Infinite Scrolling: Implement lazy loading for search results to improve performance with large datasets.

Custom Filters: Allow users to apply more granular filters (e.g., cooking time, calorie count, excluded ingredients).

Meal Planning: Extend functionality to allow users to plan meals for a week and generate a consolidated shopping list for the entire plan.
