import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewsArticles } from '../NewsArticles';
import { useCallback, useState } from 'react';
import { SearchInput } from './SearchInput';

export const SearchScreen = () => {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.container}>
      <SearchInput
        value={query}
        onSearchQueryChange={useCallback((searchQuery: string) => {
          setQuery(searchQuery.trim());
        }, [])}
      />
      <NewsArticles filter={{ tag: 'search', search: query, page: 1 }} />
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
