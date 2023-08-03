import * as React from 'react';

import {StyleSheet, View} from 'react-native';
import {HoldMenuProvider} from 'react-native-hold-menu-no-expo';
import HoldMenuButton from './components/HoldMenuButton';

export default function App() {
  return (
    <HoldMenuProvider
      safeAreaInsets={{top: 0, right: 0, left: 0, bottom: 0}}
      theme="light"
      backdropBlur={false}>
      <View style={styles.container}>
        <HoldMenuButton />
      </View>
    </HoldMenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
