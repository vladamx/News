# News App

Simple news app bootstrapped with [Expo](https://expo.io/) 
which eases up the setup of cross-cutting concerns like:

- Typescript setup
- Icons
- Resource loading (fonts)
- App icon
- Splashscreen
- Automatic release management

For a majority of big enterprise apps,
Expo becomes a burden because you want to have access to native projects 
in order to use 3-rd party native dependency and/or not rely on Expo's proprietary build system.

## Prerequisites

- Node.js - refer to .nvmrc for a version of node this project is built with


## Get your API key

[TopNews API key](https://newsapi.org/register)

Insert it in .env file, otherwise you won't be able to see the news.

## Usage

### Emulator usage

- Run ios/android emulator
- Do ```yarn ios``` or ```yarn android```

### Device usage

- Do ```yarn ios``` or ```yarn android```
- Install Expo client from PlayStore/AppStore on your device
- Scan QRCode that you can see in terminal after you have done the first step

### Pre-built applications
.ipa and apk files are located in build folder.
You can load them either via adb(android) or dragging the .ipa to ios simulator

For more information, refer to the [installation guide](https://docs.expo.io/distribution/building-standalone-apps/#5-test-it-on-your-device-or)
