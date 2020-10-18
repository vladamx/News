import * as React from 'react';
import { TextInputProps, StyleSheet } from 'react-native';
import { FunctionComponent } from 'react';
import { NewsText } from './NewsText';
import { useAppTheme } from '../theme';

export const NewsTitle: FunctionComponent<TextInputProps> = (
  props: TextInputProps,
) => {
  const {
    fonts: {
      default: { bold: titleFont },
    },
  } = useAppTheme();
  return <NewsText {...props} style={[props.style, titleFont, styles.title]} />;
};

const styles = StyleSheet.create({
  title: { fontSize: 23 },
});
