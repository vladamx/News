import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { SectionList, View, ViewToken } from 'react-native';
import { categories, Category } from './category';
import { CategoryTopArticles } from './CategoryTopArticles';
import Layout from '../../shared/Layout';
import { useCategoriesToggle } from './useCategoriesToggle';
import { useViewabilityState } from './useViewabilityState';
import { CategorySectionHeader } from './CategorySectionHeader';

// NOTE: Probably needs fine tuning, but the logic should work just fine
const viewabilityConfig = {
  waitForInteraction: false,
  minimumViewTime: 2000,
  viewAreaCoveragePercentThreshold: 60,
};

export const CategoriesScreen = () => {
  const [viewability, setViewability] = useViewabilityState();
  const [toggleState, toggleCategory] = useCategoriesToggle();
  const extraData = useMemo(() => {
    return { viewability, toggleState };
  }, [viewability, toggleState]);
  return (
    <SectionList<Category>
      viewabilityConfig={viewabilityConfig}
      extraData={extraData}
      onViewableItemsChanged={useCallback(
        ({ changed }) => {
          const newViewability: Record<string, boolean> = {};
          changed.forEach((change: ViewToken) => {
            newViewability[change.item.title as string] = change.isViewable;
          });
          setViewability((viewability) => ({
            ...viewability,
            ...newViewability,
          }));
        },
        [setViewability],
      )}
      ItemSeparatorComponent={null}
      sections={categories.map((category) => ({
        title: category,
        data: [category],
      }))}
      renderSectionHeader={({ section }) => (
        <CategorySectionHeader
          category={section.data[0]}
          onToggleCategory={() =>
            toggleCategory({
              type: 'toggleCategoryExpanded',
              payload: section.data[0],
            })
          }
        />
      )}
      renderItem={({ item }) =>
        // Item for the FlatListItems
        !toggleState[item] ? null : (
          <View
            style={{ marginTop: 10, minHeight: Layout.window.height * 0.5 }}
          >
            <CategoryTopArticles
              viewability={viewability}
              category={{ tag: 'category', name: item, page: 0, pageSize: 5 }}
            />
          </View>
        )
      }
      keyExtractor={(item, index) => `${index}`}
    />
  );
};
