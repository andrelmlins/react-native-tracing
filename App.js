import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

const App = () => (
  <View styles={styles.root}>
    <Button title="Start Tracing"></Button>
  </View>
);

const styles = StyleSheet.create({
  root: {flex: 1, paddingHorizontal: 16},
});

export default App;
