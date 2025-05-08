# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm run dev
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.








-----------------------------------------------------




```
healthcare-mobile/
├── app/
│   ├── (auth)/                  # Authentication related screens
│   │   ├── _layout.tsx          # Auth navigation layout
│   │   ├── index.tsx            # Auth entry point
│   │   ├── welcome.tsx          # Welcome screen
│   │   ├── signin.tsx           # Sign in screen
│   │   ├── signup.tsx           # Sign up screen
│   │   ├── forgot-password.tsx  # Password recovery
│   │   ├── otp-verification.tsx # OTP verification screen
│   │   ├── new-password.tsx     # New password setup
│   │   └── success.tsx          # Success screen after auth
│   │
│   ├── (tabs)/                  # Main app tabs
│   │   ├── _layout.tsx          # Tab navigation layout
│   │   ├── index.tsx            # Home tab
│   │   ├── browse.tsx           # Browse products tab
│   │   ├── cart.tsx             # Shopping cart tab
│   │   └── profile/             # Profile tab and related screens
│   │       ├── _layout.tsx      # Profile navigation layout
│   │       ├── index.tsx        # Main profile screen
│   │       ├── edit.tsx         # Edit profile
│   │       ├── address.tsx      # Manage addresses
│   │       ├── language.tsx     # Language settings
│   │       └── payment.tsx      # Payment methods
│   │
│   ├── _layout.tsx              # Root navigation layout
│   └── +not-found.tsx          # 404 error screen
│
├── components/                   # Reusable UI components
│   ├── Button.tsx
│   ├── Divider.tsx
│   ├── GreenCartLogo.tsx
│   ├── HeaderBar.tsx
│   ├── Input.tsx
│   └── ProductCard.tsx
│
├── constants/                    # App constants
│   └── Colors.tsx               # Color definitions
│
├── context/                      # React Context providers
│   └── CartContext.tsx          # Shopping cart state management
│
├── data/                        # Static data
│   └── products.ts              # Product catalog
│
└── types/                       # TypeScript type definitions
    └── product.ts               # Product-related types
```

### Key Aspects:

1. **File-based Routing**:
   - Uses Expo Router with file-based routing
   - Directory names in parentheses (e.g., `(auth)`, `(tabs)`) create route groups
   - _layout.tsx files define navigation layouts for different sections

2. **Authentication Flow** `(auth)/`:
   - Complete authentication flow with welcome, sign-in, sign-up
   - Password recovery and OTP verification
   - Success screen for completed authentication

3. **Main App Navigation** `(tabs)/`:
   - Tab-based navigation with home, browse, cart, and profile sections
   - Profile section has its own nested navigation stack
   - Each tab represents a major feature of the app

4. **Component Organization**:
   - Reusable components kept in components
   - Context providers in context for state management
   - Constants and types in their respective directories

5. **Data Management**:
   - Static data like product catalog in data
   - Types defined in types
   - Cart state managed through CartContext

### Navigation Flow:

1. App starts at root _layout.tsx
2. Unauthenticated users are directed to `(auth)` group
3. After authentication, users access the `(tabs)` group
4. Profile section has modal screens for settings and preferences
