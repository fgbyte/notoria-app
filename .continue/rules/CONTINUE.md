# CONTINUE.md - Notoria App Project Guide

## Project Overview

Notoria is a mobile application built with Expo and React Native, designed for cross-platform compatibility (iOS, Android, and Web). The app appears to focus on user authentication and content management, featuring a tabbed navigation structure with Home, Saves, and Settings sections.

### Key Technologies
- **Framework**: Expo SDK ~54.0.20 with React Native 0.81.5
- **Navigation**: Expo Router (file-based routing) with native tabs
- **Language**: TypeScript
- **Styling**: React Native StyleSheet (custom colors defined in utils/Colors.ts)
- **Build System**: EAS (Expo Application Services) for CI/CD
- **Linting/Formatting**: Biome (custom config) and ESLint
- **Package Manager**: Bun (inferred from lockfile)

### High-Level Architecture
- **Routing**: File-based routing with nested layouts
- **State Management**: Not implemented yet (basic screens)
- **Navigation Structure**:
  - Root layout with stack navigation
  - Tabbed navigation (Home, Saves, Settings)
  - Login screen as entry point

## Getting Started

### Prerequisites
- Node.js (version compatible with Expo SDK 54)
- Bun package manager (recommended based on lockfile)
- Expo CLI
- EAS CLI (for builds)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   # or npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   # or bun run start
   ```

### Basic Usage
- **Development**: `npm run dev` (disables telemetry)
- **Platform-specific**: `npm run android`, `npm run ios`, `npm run web`
- **Linting**: `npm run lint`
- **Expo Check**: `bun expo install --check`

### Running Tests
No test scripts are currently configured in package.json. Consider adding Jest or similar testing framework.

## Project Structure

### Main Directories
- **`app/`**: Main application code using file-based routing
  - `(tabs)/`: Tabbed navigation screens
  - `index.tsx`: Login/authentication screen
  - `_layout.tsx`: Root layout configuration
- **`utils/`**: Utility functions and constants (Colors.ts)
- **`assets/`**: Static assets (images, icons)
- **`.vscode/`**: VS Code configuration

### Key Files
- **`app.config.ts`**: Expo configuration with app metadata, EAS settings
- **`eas.json`**: EAS build profiles (development, preview, production)
- **`package.json`**: Dependencies and scripts
- **`tsconfig.json`**: TypeScript configuration with path aliases (@/*)
- **`biome.json`**: Code formatting and linting rules
- **`eslint.config.js`**: ESLint configuration extending expo-config

### Important Configuration
- **App Variants**: Environment-specific builds using APP_VARIANT
- **Bundle Identifiers**: Dynamic based on variant (dev/preview/prod)
- **EAS Project ID**: Hardcoded in app.config.ts (consider moving to .env)

## Development Workflow

### Coding Standards
- **TypeScript**: Strict mode enabled
- **Formatting**: Biome with single quotes, JSX single quotes, semicolons as needed
- **Linting**: Custom Biome rules focusing on correctness and security
- **Path Aliases**: `@/*` points to project root

### Testing Approach
Not yet implemented. Recommend adding:
- Unit tests for utilities
- Component tests for screens
- Integration tests for navigation

### Build and Deployment
- **Development Builds**: `npm run build-android-dev`
- **Preview Builds**: `npm run build-android-prev`
- **Production Builds**: `npm run build-android-prod`
- **Prebuild**: `npm run prebuild` (cleans cache)

### Contribution Guidelines
1. Follow Biome formatting
2. Use TypeScript strict mode
3. Maintain file-based routing structure
4. Test on multiple platforms before PR

## Key Concepts

### Navigation
- **Expo Router**: File-based routing with nested layouts
- **Native Tabs**: Custom tab bar with icons and labels
- **Stack Navigation**: For modal screens or detailed views

### Theming
- **Colors**: Centralized in `utils/Colors.ts`
- **Dark/Light Mode**: Currently light-only, but extensible

### Authentication
- **Social Login**: Placeholder for Apple/Google OAuth
- **Email Login**: Basic form structure implemented
- **Skip Option**: Temporary bypass for development

## Common Tasks

### Adding a New Screen
1. Create file in appropriate directory under `app/`
2. Use file-based routing conventions
3. Import and use COLORS from utils
4. Follow existing styling patterns

### Modifying Navigation
1. Update tab triggers in `app/(tabs)/_layout.tsx`
2. Add new routes following file structure
3. Update root layout if needed

### Building for Different Environments
1. Set APP_VARIANT environment variable
2. Use appropriate EAS profile
3. Run platform-specific build command

## Troubleshooting

### Common Issues
- **Metro Bundler Issues**: Clear cache with `npm run prebuild`
- **TypeScript Errors**: Check tsconfig.json paths and strict settings
- **Biome Formatting**: Run `biome format` or check config
- **EAS Builds**: Verify projectId and environment variables

### Debugging Tips
- Use Expo Dev Client for development builds
- Check console logs in terminal and device
- Test on physical devices for accurate behavior
- Verify bundle identifiers match EAS project

## References

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Biome Configuration](https://biomejs.dev/)
- [React Native Documentation](https://reactnative.dev/)

---

*This guide was auto-generated. Review and update as the project evolves.*