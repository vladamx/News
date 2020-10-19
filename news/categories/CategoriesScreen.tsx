import * as React from 'react';
import {
  StyleSheet,
  SectionList,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { Category, categories } from './category';
import { CategoryTopArticles } from './CategoryTopArticles';
import { NewsSubTitle } from '../../components/NewsSubTitle';
import Layout from '../../shared/Layout';
import { useCallback, useReducer, useState, Reducer, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoriesStackScreens } from './CategoriesStack';
import { Ionicons } from '@expo/vector-icons';

// NOTE: Probably needs fine tuning, but the logic should work just fine
const viewabilityConfig = {
  waitForInteraction: false,
  minimumViewTime: 2000,
  viewAreaCoveragePercentThreshold: 60,
};

const AllCategoryArticlesIcon = () => {
  return <Ionicons size={30} name="ios-list" color="white" />;
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
  const [toggleState, dispatch] = useReducer<
    Reducer<
      Record<Category, boolean>,
      { type: 'toggleCategoryExpanded'; payload: Category }
    >
  >(
    function reducer(state, action) {
      switch (action.type) {
        case 'toggleCategoryExpanded':
          return {
            ...state,
            [action.payload]: !state[action.payload],
          };
        default:
          return state;
      }
    },
    categories.reduce<Record<string, boolean>>((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {}),
  );
  const extraData = useMemo(() => {
    return { viewability, toggleState };
  }, [viewability, toggleState]);
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
      extraData={extraData}
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
          <TouchableOpacity
            onPress={() => {
              requestAnimationFrame(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                dispatch({
                  type: 'toggleCategoryExpanded',
                  payload: section.data[0],
                });
              });
            }}
          >
            <NewsSubTitle style={styles.sectionHeaderTitle}>
              {section.data[0]}
            </NewsSubTitle>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigateToCategoryScreen(section.data[0]);
            }}
          >
            <AllCategoryArticlesIcon />
          </TouchableOpacity>
        </View>
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
