import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './useCachedResources';
import Navigation from './navigation';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { NewsTitle } from './components/NewsTitle';

const ErrorFallback: FunctionComponent<FallbackProps> = ({ error }) => {
  return (
    <NewsTitle>
      Something went wrong: {error?.message ?? 'undefined error'}!
    </NewsTitle>
  );
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ErrorBoundary>
    );
  }
}
