import React from 'react';
import { View, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HoldItem } from 'react-native-hold-menu-no-expo';

const HoldMenuButton = () => {
  return (
    <View>
      <HoldItem
        closeOnTap
        activateOn="tap"
        // hapticFeedback="Light"
        // menuAnchorPosition="bottom-left"
        // bottom
        items={[
          {
            text: 'New Chat',
            // icon: () => <Icon name="plus" size={18} color="white" />,
            onPress: () => {},
          },
          {
            text: 'History',
            // icon: () => <Icon name="history" size={18} color="white" />,
            onPress: () => {},
          },
          {
            text: 'Settings',
            // icon: () => <Icon name="cog" size={18} color="white" />,
            onPress: () => {},
          },
        ]}
      >
        <View
          // activeOpacity={0.8}
          // onPress={onPress}
          style={styles.holdMenuButton}
        >
          {/* <Icon name="dots-horizontal" size={24} color="white" /> */}
        </View>
      </HoldItem>
    </View>
  );
};

export default HoldMenuButton;

const styles = StyleSheet.create({
  holdMenuButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
    padding: 13,
    marginTop: 16,
  },
});
