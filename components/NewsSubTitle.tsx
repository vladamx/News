import * as React from 'react';
import { TextInputProps, StyleSheet } from 'react-native';
import { FunctionComponent } from 'react';
import { NewsText } from './NewsText';
import { useAppTheme } from '../theme';

export const NewsSubTitle: FunctionComponent<TextInputProps> = (
  props: TextInputProps,
) => {
  const {
    fonts: {
      default: { semiBold: subTitleFont },
    },
  } = useAppTheme();
  return (
    <NewsText {...props} style={[props.style, subTitleFont, styles.title]} />
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18 },
});
