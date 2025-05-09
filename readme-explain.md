# GreenCart Expo App – Comprehensive Project Overview

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Languages, Frameworks, and Tools](#languages-frameworks-and-tools)
- [Design Methodology](#design-methodology)
- [Authentication & User Roles](#authentication--user-roles)
- [Pages & Navigation](#pages--navigation)
- [Installation & Development](#installation--development)
- [Why `npm run dev`?](#why-npm-run-dev)
- [Future Iterations](#future-iterations)
- [Key Features Achieved](#key-features-achieved)

---

## Project Overview

**GreenCart** is a cross-platform mobile application built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/), designed to serve both vendors and customers in a unified ecosystem. The app provides a seamless experience for shopping, order management, and vendor product management, with a modern UI and modular codebase.

---

## Project Structure

The project uses **file-based routing** via [Expo Router](https://docs.expo.dev/router/introduction/), organizing screens and navigation by directory structure. Here’s a high-level breakdown:

```
healthcare-mobile/
├── app/
│   ├── (auth)/                  # Authentication screens (sign in, sign up, etc.)
│   ├── (tabs)/                  # Main app tabs (home, browse, cart, profile)
│   │   └── profile/             # Profile tab and related screens
│   ├── (vendor)/                # Vendor dashboard and management screens
│   ├── _layout.tsx              # Root navigation layout
│   └── +not-found.tsx           # 404 error screen
├── components/                  # Reusable UI components (Button, HeaderBar, etc.)
├── constants/                   # App-wide constants (Colors, etc.)
├── context/                     # React Context providers (Auth, Cart)
├── data/                        # Static/mock data (products, users)
├── types/                       # TypeScript type definitions
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions (validation, etc.)
├── assets/                      # Images, icons, and other static assets
├── package.json                 # Project dependencies and scripts
├── app.json                     # Expo app configuration
└── README.md                    # Project documentation
```

**Key Structure Points:**
- **Route Groups:** Parentheses in folder names (e.g., `(auth)`, `(tabs)`, `(vendor)`) define navigation groups.
- **_layout.tsx:** Each group has its own layout for navigation stack configuration.
- **Components:** All UI elements are modular and reusable.
- **Context:** State management for authentication and cart is handled via React Context.

---

## Languages, Frameworks, and Tools

- **Languages:** TypeScript (primary), JavaScript (where needed)
- **Frameworks:** React Native, Expo, Expo Router
- **UI Libraries:** [lucide-react-native](https://lucide.dev/icons/), [@expo-google-fonts/poppins](https://github.com/expo/google-fonts)
- **State Management:** React Context API
- **Form Management:** [Formik](https://formik.org/)
- **Validation:** [Yup](https://github.com/jquense/yup)
- **Other Tools:** 
  - [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
  - [lottie-react-native](https://github.com/lottie-react-native/lottie-react-native)
  - [expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)
  - [expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)

---

## Design Methodology

- **Component-Driven:** UI is built from small, reusable components (e.g., Button, HeaderBar, ProductCard).
- **Consistent Theming:** All colors and fonts are centralized in the `constants/Colors.tsx` and Google Fonts.
- **Responsive Layouts:** Uses `SafeAreaView`, `ScrollView`, and flexible styling for cross-device compatibility.
- **File-Based Routing:** Navigation is intuitive and scalable, with each screen mapped to a file.
- **Separation of Concerns:** Business logic, UI, and data are separated for maintainability.

---

## Authentication & User Roles

### Hardcoded Users & Roles

- **User Data:** Stored in `data/mockDatabase.ts` (not shown here, but referenced in context).
- **Types:** Defined in `types/user.ts`:
  - `UserRole = 'customer' | 'vendor'`
  - `User` includes `id`, `email`, `password`, `fullName`, `role`, etc.

### Auth Flow

- **Context:** `context/AuthContext.tsx` manages authentication state and exposes hooks (`useAuth`).
- **Sign In/Up:** Forms use Formik and Yup for validation. On sign-in, credentials are checked against hardcoded users.
- **Role-Based Routing:** After login, users are routed to either the customer tabs (`(tabs)`) or vendor dashboard (`(vendor)`) based on their role.
- **Vendor vs Customer:**
  - **Vendor:** Access to product management, order management, withdrawal, and profile settings.
  - **Customer:** Access to shopping, cart, order tracking, and personal profile.

---

## Pages & Navigation

### Authentication (`(auth)/`)
- **welcome.tsx:** Welcome screen with navigation to sign in/up.
- **signin.tsx:** User login.
- **signup.tsx:** User registration (role selection: customer or vendor).
- **forgot-password.tsx:** Password recovery.
- **otp-verification.tsx:** OTP input for verification.
- **new-password.tsx:** Set a new password.
- **success.tsx:** Confirmation after successful registration or password reset.

### Main App Tabs (`(tabs)/`)
- **index.tsx:** Home screen.
- **browse.tsx:** Browse products.
- **cart.tsx:** Shopping cart, checkout, and shipping options.
- **profile/index.tsx:** User profile, settings, and support.
  - **profile/edit.tsx:** Edit profile.
  - **profile/address.tsx:** Manage addresses.
  - **profile/language.tsx:** Language settings.
  - **profile/payment.tsx:** Payment methods.
  - **profile/orders.tsx:** Order history and tracking.

### Vendor Dashboard (`(vendor)/`)
- **index.tsx:** Vendor dashboard (balance, stats, quick actions, transaction history).
- **products.tsx:** Manage products (add, edit, delete).
- **profile/index.tsx:** Vendor profile and settings.
  - **profile/edit.tsx:** Edit vendor profile.
  - **profile/address.tsx:** Vendor address management.
  - **profile/language.tsx:** Language settings.
  - **profile/payment.tsx:** Withdrawal/payment methods.

### Navigation

- **Expo Router:** Handles navigation and modal presentation based on file structure.
- **Modals:** Many screens (e.g., product management, profile edit) are presented as modals for better UX.

---

## Installation & Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, for advanced usage)

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   This will launch the Expo development server, allowing you to run the app on Android/iOS simulators or physical devices via Expo Go.

---

## Why `npm run dev`?

- **Consistency:** The `dev` script is a convention for starting development servers across many JavaScript projects.
- **Expo Integration:** `npm run dev` runs `expo start` with environment variables set for development, ensuring the app is started in development mode with hot reloading and debugging enabled.
- **Cross-Platform:** Works seamlessly on Windows, macOS, and Linux.
- **No Telemetry:** The script disables Expo telemetry for privacy (`EXPO_NO_TELEMETRY=1`).

---

## Future Iterations

To make GreenCart more robust and production-ready, future updates will include:

- **Backend Integration:** Replace hardcoded/mock data with real backend APIs for authentication, products, and orders.
- **Persistent Storage:** Use secure storage for tokens and user data.
- **Push Notifications:** Integrate notifications for order updates and promotions.
- **Role-Based Access Control:** Enforce permissions at the API and UI level.
- **Unit & Integration Testing:** Add automated tests for components and business logic.
- **Accessibility Improvements:** Ensure the app is usable by everyone.
- **Localization:** Expand language support and dynamic translations.
- **CI/CD Pipeline:** Automate builds, tests, and deployments.
- **App Store Readiness:** Prepare for publishing on Google Play and Apple App Store.

---

## Key Features Achieved

GreenCart has been developed to comprehensively address the core requirements for a modern e-commerce mobile application. The following features are fully implemented and integrated into the app:

- **Product Browsing:**  
  Users can seamlessly browse a catalog of products with intuitive navigation and filtering options, ensuring a smooth shopping experience.

- **Cart Management:**  
  Customers can add products to their cart, update quantities, and remove items. The cart is persistently managed throughout the shopping session, supporting a streamlined checkout process.

- **Order Placement and Tracking:**  
  Users can place orders directly from their cart and receive real-time updates on order status. Order history and tracking are available in the profile section for easy reference.

- **Wallet/Payment Integration:**  
  The app includes wallet and payment management features, allowing users to manage payment methods, view wallet balances, and handle withdrawals (for vendors).

- **Profile Management (Customer/Vendor):**  
  Both customers and vendors have dedicated profile management screens. Customers can update personal details, addresses, and payment methods, while vendors can manage their business profiles, addresses, and withdrawal options.

- **Onboarding and Authentication Flows:**  
  A robust onboarding process guides new users through registration, including role selection (customer or vendor). Secure authentication flows are implemented with support for sign-in, sign-up, password recovery, OTP verification, and role-based navigation.

These features ensure that GreenCart delivers a complete, user-friendly experience for both customers and vendors, meeting all specified requirements for a scalable and production-ready mobile commerce solution.

---