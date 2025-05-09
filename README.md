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
│   ├── (auth)/                  # Authentication screens (sign in, sign up, etc.)
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
│   ├── (tabs)/                  # Main app tabs for customers
│   │   ├── _layout.tsx          # Tab navigation layout (Home, Browse, Cart, Profile)
│   │   ├── index.tsx            # Home tab (dashboard, orders, offers)
│   │   ├── browse.tsx           # Browse products tab (catalog, filtering)
│   │   ├── cart.tsx             # Shopping cart tab (cart, checkout, shipping)
│   │   └── profile/             # Profile tab and related screens
│   │       ├── _layout.tsx      # Profile navigation layout
│   │       ├── index.tsx        # Main profile screen (settings, orders)
│   │       ├── edit.tsx         # Edit profile
│   │       ├── address.tsx      # Manage addresses
│   │       ├── language.tsx     # Language settings
│   │       ├── payment.tsx      # Payment methods
│   │       └── orders.tsx       # Order history and tracking
│   │
│   ├── (vendor)/                # Vendor dashboard and management screens
│   │   ├── _layout.tsx          # Vendor navigation layout
│   │   ├── index.tsx            # Vendor dashboard (balance, stats, actions)
│   │   ├── products.tsx         # Manage products (add, edit, delete)
│   │   └── profile/             # Vendor profile and settings
│   │       ├── _layout.tsx      # Vendor profile navigation layout
│   │       ├── index.tsx        # Vendor profile main screen
│   │       ├── edit.tsx         # Edit vendor profile
│   │       ├── address.tsx      # Vendor address management
│   │       ├── language.tsx     # Language settings
│   │       └── payment.tsx      # Withdrawal/payment methods
│   │
│   ├── _layout.tsx              # Root navigation layout (handles auth and main app)
│   └── +not-found.tsx           # 404 error screen
│
├── components/                  # Reusable UI components (buttons, headers, cards)
│   ├── Button.tsx
│   ├── Divider.tsx
│   ├── GreenCartLogo.tsx
│   ├── HeaderBar.tsx
│   ├── Input.tsx
│   └── ProductCard.tsx
│
├── constants/                   # App-wide constants (colors, fonts, etc.)
│   └── Colors.tsx
│
├── context/                     # React Context providers for global state
│   ├── AuthContext.tsx          # Authentication state management
│   └── CartContext.tsx          # Shopping cart state management
│
├── data/                        # Static/mock data for the app
│   ├── products.ts              # Product catalog
│   └── mockDatabase.ts          # Hardcoded users, orders, etc.
│
├── hooks/                       # Custom React hooks (e.g., useAuth, useCart)
│   └── useDebounce.ts           # Example: debounce hook for search
│
├── types/                       # TypeScript type definitions
│   ├── product.ts               # Product-related types
│   └── user.ts                  # User-related types
│
├── utils/                       # Utility functions (validation, formatting, etc.)
│   └── validation.ts            # Example: form validation helpers
│
├── assets/                      # Images, icons, and other static assets
│   └── images/                  # App images
│
├── package.json                 # Project dependencies and scripts
├── app.json                     # Expo app configuration
└── README.md                    # Project documentation
```

**Key Structure Points:**
- **Route Groups:** Parentheses in folder names (e.g., `(auth)`, `(tabs)`, `(vendor)`) define navigation groups for Expo Router. This enables role-based navigation and modular screen organization.
- **_layout.tsx:** Each group has its own layout for navigation stack configuration (e.g., tabs for customers, dashboard for vendors).
- **Components:** All UI elements are modular and reusable, promoting consistency and maintainability.
- **Context:** State management for authentication and cart is handled via React Context, providing global access to user and cart data.
- **Data:** Static/mock data is used for products, users, and orders. This can be replaced with real backend APIs in the future.
- **Hooks & Utils:** Custom hooks and utility functions help encapsulate logic and keep components clean.
- **Types:** TypeScript types ensure type safety and clarity across the codebase.
- **Assets:** All images and icons are stored in the assets directory for easy management.
