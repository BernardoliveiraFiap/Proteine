import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResponsiveScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RM551356 ENZO OLIVEIRA</Text>
      <Text style={styles.text}>MATHEUS COLOSSAL RM99572</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
});

export default ResponsiveScreen;
