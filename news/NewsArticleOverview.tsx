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
  overview: Pick<NewsArticle, 'title' | 'image' | 'description'>;
  onPress?: () => void;
};

export const NewsArticleOverview: FunctionComponent<NewsArticleOverview> = ({
  overview: { title, description, image },
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
              height: Layout.window.width / 1.25,
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
  },
  overviewTitle: { marginBottom: 10, paddingHorizontal: 10 },
  overviewImage: { marginBottom: 10 },
});
