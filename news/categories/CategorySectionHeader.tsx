import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { NewsSubTitle } from '../../components/NewsSubTitle';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigateToCategory } from './useNavigateToCategory';

const AllCategoryArticlesIcon = () => {
  return <Ionicons size={30} name="ios-list" color="white" />;
};

export const CategorySectionHeader: FunctionComponent<{
  category: string;
  onToggleCategory: () => void;
}> = ({ category, onToggleCategory }) => {
  const navigateToCategoryScreen = useNavigateToCategory();

  return (
    <View style={styles.sectionHeader}>
      <TouchableOpacity
        onPress={() => {
          requestAnimationFrame(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            onToggleCategory();
          });
        }}
      >
        <NewsSubTitle style={styles.sectionHeaderTitle}>
          {category}
        </NewsSubTitle>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigateToCategoryScreen(category);
        }}
      >
        <AllCategoryArticlesIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  sectionHeaderTitle: {
    color: 'white',
  },
});
