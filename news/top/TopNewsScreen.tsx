import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewsArticles } from '../NewsArticles';

export const TopNewsScreen = () => {
  return (
    <View style={styles.container}>
      <NewsArticles />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
