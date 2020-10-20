import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoriesStackScreens } from './CategoriesStack';
type CategoriesNavigationProp = StackNavigationProp<
  CategoriesStackScreens,
  'Categories'
>;
export const useNavigateToCategory = () => {
  const navigation = useNavigation<CategoriesNavigationProp>();
  return useCallback(
    (category) => {
      navigation.navigate('CategoryAllArticles', {
        name: category,
      });
    },
    [navigation],
  );
};
