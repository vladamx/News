import * as React from 'react';
import { TextInputProps, Text } from 'react-native';
import { FunctionComponent } from 'react';
import { useAppTheme } from '../theme';

export const NewsText: FunctionComponent<TextInputProps> = (
  props: TextInputProps,
) => {
  const {
    fonts: {
      default: { regular: regularFont },
    },
  } = useAppTheme();
  return <Text {...props} style={[props.style, regularFont]} />;
};
