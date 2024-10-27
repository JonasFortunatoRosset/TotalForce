import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Plano1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Plano 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB031',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
