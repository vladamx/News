import * as React from 'react';
import { TextInputProps, StyleSheet } from 'react-native';
import { FunctionComponent } from 'react';
import { NewsText } from './NewsText';

export const NewsSubTitle: FunctionComponent<TextInputProps> = (
  props: TextInputProps,
) => {
  return <NewsText {...props} style={[props.style, styles.title]} />;
};

const styles = StyleSheet.create({
  title: { fontFamily: 'open-sans-semi-bold', fontSize: 18 },
});
