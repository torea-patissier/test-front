## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS development:
  - macOS computer
  - Xcode (latest version)
  - iOS Simulator
- For Android development:
  - Android Studio
  - Android SDK
  - Android Emulator

## Installation

1. Clone the repository:
```bash
git https://github.com/torea-patissier/test-front.git

cd test-front
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

To start the development server:

```bash
npm start
# or
yarn start
```

This will open the Expo development server where you can choose to run the app on:
- iOS Simulator (macOS only)
- Android Emulator
- Physical device through Expo Go app

### Platform Specific Commands

Run on iOS:
```bash
npm run ios
# or
yarn ios
```

Run on Android:
```bash
npm run android
# or
yarn android
```

## Project Structure

This project uses:
- Expo Router for navigation
- Tamagui for UI components
- TypeScript for type safety
- Jest for testing
- ESLint and Prettier for code formatting
- Husky for git hooks
- Conventional Commits for commit messages

## Scripts

- `start`: Start the Expo development server
- `android`: Start the app on Android
- `ios`: Start the app on iOS
- `web`: Start the app on web
- `test`: Run tests in watch mode
- `lint`: Run ESLint

## Contributing

This project uses:
- Conventional Commits for commit messages
- Husky for git hooks
- lint-staged for running checks before commits

Make sure to follow the commit message convention as the project uses commitlint to enforce it.

## Dependencies

The project uses several key dependencies:
- Expo SDK 52
- React 18.3.1
- React Native 0.76.7
- Tamagui for UI components
- React Navigation
- And various Expo modules for additional functionality
