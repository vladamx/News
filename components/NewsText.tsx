import * as React from 'react';
import { TextInputProps, Text } from 'react-native';
import { FunctionComponent } from 'react';

export const NewsText: FunctionComponent<TextInputProps> = (
  props: TextInputProps,
) => {
  return <Text {...props} style={[props.style, styles.fontFamily]} />;
};

const styles = {
  fontFamily: { fontFamily: 'space-mono' },
};
