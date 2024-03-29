import 'dotenv/config';

export default {
  name: 'News',
  slug: 'News',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'news',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'com.org.news',
    buildNumber: '1.0.0',
  },
  android: {
    package: 'com.org.news',
    versionCode: 1,
  },
  extra: {
    topNewsApi: process.env.TOP_NEWS_API,
    topNewsApiKey: process.env.TOP_NEWS_API_KEY,
  },
};
