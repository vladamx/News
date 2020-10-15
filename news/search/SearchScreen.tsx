import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewsText } from '../../components/NewsText';

export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <NewsText style={styles.title}>Search</NewsText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
