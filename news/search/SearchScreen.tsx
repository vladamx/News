import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewsArticles } from '../NewsArticles';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

export const SearchScreen = () => {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.container}>
      <SearchInput
        onSearchQueryChange={(searchQuery: string) => {
          setQuery(searchQuery);
        }}
      />
      <NewsArticles filter={{ tag: 'search', search: query }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
