import * as React from 'react';
import {
  Image,
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
        <Image
          defaultSource={require('../assets/images/placeholder.png')}
          style={[
            {
              width: Layout.window.width,
              height: Layout.window.width / 1.77,
            },
            styles.overviewImage,
          ]}
          source={{ uri: image }}
        />
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
  overviewImage: { marginBottom: 10 },
});
