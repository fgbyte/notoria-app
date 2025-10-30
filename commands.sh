bunx create-expo pocket-app --template default@next
bunx expo install expo-dev-client # need dev build
bunx expo install react-native-keyboard-controller # need dev build

bunx expo install @clerk/clerk-expo expo-secure-store expo-auth-session # need dev build
bunx expo install fast-xml-parser


bunx expo install expo-sqlite

bun add -D drizzle-kit
bun i drizzle-orm babel-plugin-inline-import
bun install expo-drizzle-studio-plugin
bunx expo install expo-crypto

bun add react-native-legal
bunx expo install expo-dynamic-app-icon
bun install expo-share-intent
bun add patch-package
bunx expo install expo-linking
bunx expo install react-native-fast-shimmer
bunx expo install react-native-render-html

npx @sentry/wizard@latest -i reactNative --saas --org galaxies --project pocket-clone

eas login
eas init
eas build -p ios

bunx expo install react-native-purchases react-native-purchases-ui

bun add zeego
bun add react-native-ios-context-menu@3.1.0 react-native-ios-utilities@5.1.2
bun add @react-native-menu/menu@1.2.2


bunx expo install @expo/ui
bun install react-native-worklets@latest react-native-reanimated@latest