import React, { useRef, FunctionComponent, useCallback, memo } from 'react';
import { View, StyleSheet, TextInput, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'debounce';
import { useTranslation } from 'react-i18next';
import { useInputAutoFocusOnScreenFocus } from './useInputAutoFocusOnScreenFocus';

interface SearchStationsTextInputProps {
  onSearchQueryChange: (query: string) => void;
  value: string;
}

const SearchIcon = (props: { color: string; style: TextStyle }) => {
  return <Ionicons size={30} {...props} name="ios-search" />;
};

// NOTE: Search input is uncontrolled and memoized component in order to avoid performance problems
export const SearchInput: FunctionComponent<SearchStationsTextInputProps> = memo(
  ({ onSearchQueryChange, value }) => {
    const textInputRef = useRef<TextInput>();
    const [t] = useTranslation('newsTranslations');

    useInputAutoFocusOnScreenFocus(textInputRef);

    const onQueryChange = useCallback(debounce(onSearchQueryChange, 400), []);

    return (
      <View style={[styles.search]}>
        <SearchIcon color={'black'} style={styles.icon} />
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={onQueryChange}
            autoCorrect={false}
            defaultValue={value}
            selectTextOnFocus={true}
            placeholder={t('search')}
            autoCompleteType="off"
            returnKeyType="done"
            placeholderTextColor="#cccccc"
            style={[styles.input, { backgroundColor: 'white' }]}
            ref={(r: TextInput) => {
              textInputRef.current = r;
            }}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  search: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: { marginRight: 5 },
  inputContainer: { flex: 1 },
  input: {
    height: 46,
    fontSize: 15,
    paddingVertical: 10,
    flexGrow: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
