import React, { useRef, useEffect, FunctionComponent } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
  TextInput,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface SearchStationsTextInputProps {
  onSearchQueryChange: (query: string) => void;
  loading?: boolean;
}

const SearchIcon = (props: { color: string; style: TextStyle }) => {
  return <Ionicons size={30} {...props} name="ios-search" />;
};

export const SearchInput: FunctionComponent<SearchStationsTextInputProps> = ({
  onSearchQueryChange,
  loading = false,
}) => {
  const textInputRef = useRef<TextInput>();
  const isFocused = useIsFocused();

  /**
   * Autofocus opens keyboard automatically when navigating to Search, but
   * keyboard opening has slow performance and blocks displaying content of Search
   * instantly.
   *
   * The solution here is to focus the text input with a timeout right after Search
   * page is displayed.
   */
  useEffect(() => {
    if (isFocused) {
      InteractionManager.runAfterInteractions(() => {
        // NOTE: Set timeout is safety precaution
        // because sometimes keyboard doesn't show on Android
        setTimeout(() => {
          textInputRef?.current?.focus();
        }, 1);
      });
    } else {
      textInputRef.current?.blur();
    }
  }, [isFocused]);

  return (
    <View style={[styles.search]}>
      <SearchIcon color={'black'} style={styles.icon} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Search'}
          onChangeText={onSearchQueryChange}
          autoCorrect={false}
          selectionColor="black"
          autoCompleteType="off"
          returnKeyType="done"
          placeholderTextColor="grey"
          style={[styles.input, { backgroundColor: 'white' }]}
          ref={(r: TextInput) => {
            textInputRef.current = r;
          }}
        />
        <ActivityIndicator
          animating={loading}
          style={styles.loadingIndicator}
          size={16}
          color="black"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: { marginRight: 5 },
  inputContainer: { flex: 1 },
  input: {
    height: 40,
    fontSize: 15,
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
