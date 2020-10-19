import * as React from 'react';
import { StyleSheet, SectionList, View, TouchableOpacity } from 'react-native';
import { Category, categories } from './category';
import { CategoryTopArticles } from './CategoryTopArticles';
import { NewsSubTitle } from '../../components/NewsSubTitle';
import Layout from '../../shared/Layout';
import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoriesStackScreens } from './CategoriesStack';

// NOTE: Probably needs fine tuning, but the logic should work just fine
const viewabilityConfig = {
  waitForInteraction: false,
  minimumViewTime: 2000,
  viewAreaCoveragePercentThreshold: 60,
};

type CategoriesNavigationProp = StackNavigationProp<
  CategoriesStackScreens,
  'Categories'
>;

export const CategoriesScreen = () => {
  const [viewability, setViewability] = useState(
    categories.reduce<Record<string, boolean>>((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {}),
  );
  const navigation = useNavigation<CategoriesNavigationProp>();
  const navigateToCategoryScreen = useCallback(
    (category) => {
      navigation.navigate('CategoryAllArticles', {
        name: category,
      });
    },
    [navigation],
  );
  return (
    <SectionList<Category>
      viewabilityConfig={viewabilityConfig}
      extraData={viewability}
      onViewableItemsChanged={({ changed }) => {
        const newViewability: Record<string, boolean> = {};
        changed.forEach((change) => {
          newViewability[change.item.title as string] = change.isViewable;
        });
        setViewability((viewability) => ({
          ...viewability,
          ...newViewability,
        }));
      }}
      ItemSeparatorComponent={null}
      sections={categories.map((category) => ({
        title: category,
        data: [category],
      }))}
      renderSectionHeader={({ section }) => (
        <TouchableOpacity
          onPress={() => {
            navigateToCategoryScreen(section.data[0]);
          }}
          style={styles.sectionHeader}
        >
          <NewsSubTitle style={styles.sectionHeaderTitle}>
            {section.data[0]}
          </NewsSubTitle>
        </TouchableOpacity>
      )}
      renderItem={({ item }) => (
        // Item for the FlatListItems
        <View style={{ marginTop: 10, minHeight: Layout.window.height * 0.5 }}>
          <CategoryTopArticles
            viewability={viewability}
            category={{ tag: 'category', name: item, page: 0, pageSize: 5 }}
          />
        </View>
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 10,
    backgroundColor: 'black',
  },
  sectionHeaderTitle: {
    color: 'white',
  },
});
