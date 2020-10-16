import { FunctionComponent } from 'react';
import { View } from 'react-native';
import * as React from 'react';
import { NewsText } from './NewsText';

export const NewsError: FunctionComponent<{ reason: string }> = ({
  reason,
}) => {
  return (
    <View style={styles.errorContainer}>
      <NewsText style={styles.reason}>{reason}</NewsText>
    </View>
  );
};

const styles = {
  errorContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 20,
  },
  reason: {
    textAlign: 'center' as 'center',
    color: 'white',
  },
};
