import Constants from 'expo-constants';

export const environment = {
  topNews: {
    api: Constants.manifest.extra.topNewsApi,
    apiKey: Constants.manifest.extra.topNewsApiKey,
  },
};
