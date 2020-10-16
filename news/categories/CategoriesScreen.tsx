import * as React from 'react';
import { StyleSheet, SectionList, View } from 'react-native';
import { Category, categories } from './category';
import { TopNewsPerCategory } from './TopNewsPerCategory';
import { NewsSubTitle } from '../../components/NewsSubTitle';
import Layout from '../../shared/Layout';
import { useState } from 'react';

// NOTE: Probably needs fine tuning, but the logic should work just fine
const viewabilityConfig = {
  waitForInteraction: false,
  minimumViewTime: 2000,
  viewAreaCoveragePercentThreshold: 60,
};

export const CategoriesScreen = () => {
  const [viewability, setViewability] = useState(
    categories.reduce<Record<string, boolean>>((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {}),
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
        <View style={styles.sectionHeader}>
          <NewsSubTitle style={styles.sectionHeaderTitle}>
            {section.data[0]}
          </NewsSubTitle>
        </View>
      )}
      renderItem={({ item }) => (
        // Item for the FlatListItems
        <View style={{ marginTop: 10, minHeight: Layout.window.height * 0.6 }}>
          <TopNewsPerCategory viewability={viewability} category={item} />
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
