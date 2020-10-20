import { MutableRefObject, useEffect } from 'react';
import { InteractionManager, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export const useInputAutoFocusOnScreenFocus = (
  textInputRef: MutableRefObject<TextInput | undefined>,
) => {
  const isScreenFocused = useIsFocused();
  useEffect(() => {
    if (isScreenFocused) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          textInputRef?.current?.focus();
        }, 1);
      });
    } else {
      textInputRef.current?.blur();
    }
  }, [isScreenFocused, textInputRef]);
};
