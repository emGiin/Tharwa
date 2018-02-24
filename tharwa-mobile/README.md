#  Tharwa Mobile Application

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## Requirements
Install the following :
 - [Node v7.6+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [Visual Studio Code](https://code.visualstudio.com/download)
 - [Android SDK](https://code.visualstudio.com/download)

## Steps for Getting Started

To get started, run the following commands : 

```bash
git clone https://github.com/emGiin/tharwa-mobile
cd tharwa-web
git checkout develop
yarn
# or use npm
npm install
```


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    ```bash
    react-native run-ios
    ```
  * for Android
    * Run Genymotion 
    ```bash
    react-native run-android
    ```

## :no_entry_sign: Standard Compliant

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to our javascript code in React Native. We can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```js
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```