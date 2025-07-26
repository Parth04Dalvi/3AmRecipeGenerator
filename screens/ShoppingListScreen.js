// --- Screens (src/screens/ShoppingListScreen.js) ---
const ShoppingListScreen = () => {
  const { shoppingList, toggleShoppingListItem, removeShoppingListItem, addCustomShoppingListItem, clearShoppingList } = useContext(AppContext);
  const [newItemText, setNewItemText] = useState('');
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);
  const [messageBoxMessage, setMessageBoxMessage] = useState('');

  const handleAddItem = () => {
    if (newItemText.trim()) {
      addCustomShoppingListItem(newItemText);
      setNewItemText('');
      setMessageBoxMessage('Item added to shopping list!');
      setMessageBoxVisible(true);
    } else {
      setMessageBoxMessage('Please enter an item to add.');
      setMessageBoxVisible(true);
    }
  };

  const handleClearList = () => {
    clearShoppingList();
    setMessageBoxMessage('Shopping list cleared!');
    setMessageBoxVisible(true);
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <Text style={screenStyles.header}>Shopping List</Text>

      <View style={screenStyles.shoppingListInputContainer}>
        <TextInput
          style={screenStyles.shoppingListInput}
          placeholder="Add custom item..."
          value={newItemText}
          onChangeText={setNewItemText}
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity style={screenStyles.shoppingListAddButton} onPress={handleAddItem}>
          <Text style={screenStyles.shoppingListAddButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={screenStyles.shoppingListItem}>
            <Pressable
              style={screenStyles.shoppingItemCheckbox}
              onPress={() => toggleShoppingListItem(item.id)}
            >
              <Text style={item.checked ? screenStyles.checkedText : screenStyles.uncheckedText}>
                {item.checked ? '☑️' : '☐'}
              </Text>
            </Pressable>
            <Text
              style={[
                screenStyles.shoppingItemText,
                item.checked && screenStyles.shoppingItemTextChecked,
              ]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => removeShoppingListItem(item.id)}>
              <Text style={screenStyles.shoppingItemRemoveButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={screenStyles.emptyListText}>Your shopping list is empty.</Text>
        }
        contentContainerStyle={screenStyles.listContentContainer}
      />

      {shoppingList.length > 0 && (
        <TouchableOpacity style={screenStyles.clearListButton} onPress={handleClearList}>
          <Text style={screenStyles.clearListButtonText}>Clear Shopping List</Text>
        </TouchableOpacity>
      )}
      <MessageBox
        visible={messageBoxVisible}
        message={messageBoxMessage}
        onClose={() => setMessageBoxVisible(false)}
      />
    </SafeAreaView>
  );
};