# Tharwa web application

## Requirements
Install the following :
 - [Node v7.6+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [Visual Studio Code](https://code.visualstudio.com/download)


## Steps for Getting Started
Thanks to [create-react-app](https://github.com/facebookincubator/create-react-app), we will have a configuration-free dev experience. 

To get started, please clone this git repository and then run `npm install` once under the project top-level directory. 

```bash
git clone https://github.com/emGiin/tharwa-web
cd tharwa-web
git checkout develop
yarn
# or use npm
npm install
```
This will install the dependencies.

## While You're Developing...
Whenever you want to run/test the program, `cd` to the project top-level directory. Use these commands:

### `yarn start`

Runs the app in the development mode, using the Webpack-provided "development server".<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.<br>

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Developing Components in Isolation

Usually, in an app, you have a lot of UI components, and each of them has many different states.
For an example, a simple button component could have following states:

* In a regular state, with a text label.
* In the disabled mode.
* In a loading state.

Usually, it’s hard to see these states without running a sample app or some examples.

![Storybook for React Demo](http://i.imgur.com/7CIAWpB.gif)

We can also deploy our Storybook or style guide as a static app. This way, everyone in our team can view and review different states of UI components without starting a backend server or creating an account.

### Getting Started with Storybook

Storybook is a development environment for React UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.

Run the following command inside your app’s directory:

```sh
yarn storybook
```

Learn more about React Storybook:

* Screencast: [Getting Started with React Storybook](https://egghead.io/lessons/react-getting-started-with-react-storybook)
* [GitHub Repo](https://github.com/storybooks/storybook)
* [Documentation](https://storybook.js.org/basics/introduction/)
* [Snapshot Testing UI](https://github.com/storybooks/storybook/tree/master/addons/storyshots) with Storybook + addon/storyshot

### Getting Started with Styleguidist

Styleguidist combines a style guide, where all your components are presented on a single page with their props documentation and usage examples, with an environment for developing components in isolation, similar to Storybook. In Styleguidist you write examples in Markdown, where each code snippet is rendered as a live editable playground.

Run the following command inside your app’s directory:

```sh
yarn styleguide
```

Learn more about React Styleguidist:

* [GitHub Repo](https://github.com/styleguidist/react-styleguidist)
* [Documentation](https://react-styleguidist.js.org/docs/getting-started.html)