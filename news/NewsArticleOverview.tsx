import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NewsArticle } from './newsArticle';
import { NewsText } from '../components/NewsText';
import { FunctionComponent } from 'react';
import Layout from '../shared/Layout';
import { NewsTitle } from '../components/NewsTitle';
import { Image } from 'react-native-expo-image-cache';

type NewsArticleOverview = {
  onPress?: () => void;
} & Pick<NewsArticle, 'title' | 'image' | 'description'>;

export const NewsArticleOverview: FunctionComponent<NewsArticleOverview> = ({
  title,
  description,
  image,
  onPress,
}) => {
  const Touchable = onPress ? TouchableOpacity : TouchableWithoutFeedback;
  return (
    <Touchable
      delayPressIn={50}
      delayPressOut={50}
      onPress={onPress}
      style={styles.overviewContainer}
    >
      <View>
        <NewsTitle style={styles.overviewTitle}>{title}</NewsTitle>
        <View style={styles.cover}>
          <ActivityIndicator animating={true} />
          <Image
            style={[
              {
                width: Layout.window.width,
                height: Layout.window.width / 1.7778,
              },
              styles.overviewImage,
            ]}
            {...{ uri: image }}
          />
        </View>
        <NewsText style={styles.description}>{description}</NewsText>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  overviewContainer: {},
  description: {
    paddingHorizontal: 10,
    flexShrink: 1,
    flexWrap: 'wrap',
    width: Layout.window.width,
  },
  overviewTitle: {
    marginBottom: 10,
    paddingHorizontal: 10,
    flexShrink: 1,
    flexWrap: 'wrap',
    width: Layout.window.width,
  },
  cover: {
    width: Layout.window.width,
    height: Layout.window.width / 1.7778,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  overviewImage: { ...StyleSheet.absoluteFillObject },
});
