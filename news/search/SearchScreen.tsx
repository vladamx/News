import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchInput } from './SearchInput';

export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchInput onSearchQueryChange={(query) => console.log(query)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
