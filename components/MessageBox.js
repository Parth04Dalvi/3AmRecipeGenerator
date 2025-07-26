// --- Components (src/components/MessageBox.js) ---
const MessageBox = ({ visible, message, onClose, title = 'Message' }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={componentStyles.messageBoxOverlay}>
        <View style={componentStyles.messageBoxContainer}>
          <Text style={componentStyles.messageBoxTitle}>{title}</Text>
          <Text style={componentStyles.messageBoxMessage}>{message}</Text>
          <TouchableOpacity style={componentStyles.messageBoxButton} onPress={onClose}>
            <Text style={componentStyles.messageBoxButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};