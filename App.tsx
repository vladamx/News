import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import useCachedResources from './useCachedResources';
import { NewsNavigation } from './news/NewsNavigation';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { NewsTitle } from './components/NewsTitle';
import { DEFAULT_APP_THEME, ThemeContext } from './theme';
import { store } from './store';
import { UIManager, Platform } from 'react-native';
import './i18n';

const ErrorFallback: FunctionComponent<FallbackProps> = ({ error }) => {
  return (
    <NewsTitle>
      Something went wrong: {error?.message ?? 'undefined error'}!
    </NewsTitle>
  );
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <SafeAreaProvider>
            <ThemeContext.Provider value={DEFAULT_APP_THEME}>
              <NewsNavigation />
              <StatusBar />
            </ThemeContext.Provider>
          </SafeAreaProvider>
        </ErrorBoundary>
      </Provider>
    );
  }
}
