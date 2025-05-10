# GreenCart: A Dual-Role Mobile Commerce Solution

![GreenCart Logo](https://via.placeholder.com/150x150?text=GreenCart)
![GreenCart Logo](https://via.placeholder.com/150x150?text=GreenCart)
![GreenCart Logo](https://via.placeholder.com/150x150?text=GreenCart)


## Quick Start - Test Credentials

Use these credentials to quickly test the application:

**Customer Account:**
- Email: customer@example.com
- Password: Pass123!
- Role: customer

**Vendor Account:**
- Email: vendor@example.com
- Password: Pass123!
- Role: vendor

## Table of Contents
- [Project Overview](#project-overview)
- [Inspiration](#inspiration)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Technical Stack](#technical-stack)
- [Authentication & User Roles](#authentication--user-roles)
- [Pages & Navigation](#pages--navigation)
- [Installation & Development](#installation--development)
- [How I Built It](#how-i-built-it)
- [Challenges Faced](#challenges-faced)
- [Accomplishments](#accomplishments)
- [Lessons Learned](#lessons-learned)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

---

## Project Overview

**GreenCart** is a cross-platform mobile application built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/), designed to serve both vendors and customers in a unified ecosystem. The app provides a seamless experience for shopping, order management, and vendor product management, with a modern UI and modular codebase.

Unlike traditional e-commerce applications that create separate ecosystems for buyers and sellers, GreenCart brings both parties together in a single, intuitive platform where the user experience changes dynamically based on the account type.

---

## Inspiration

The inspiration for GreenCart came from observing the fragmentation in today's mobile commerce landscape. Too often, vendors and customers are forced to use separate applications, creating disconnected experiences and unnecessary complexity. 

I wanted to build a unified platform where both sides of the marketplace could interact seamlessly within a single application. Drawing inspiration from established marketplaces but aiming to simplify the experience, GreenCart emerged as a solution that brings together buyers and sellers in an intuitive, accessible mobile environment.

---

## Key Features

### For Customers
- **Product Browsing:** Intuitive catalog with detailed product views and specifications
- **Cart Management:** Add, modify quantities, and remove items with persistent state
- **Checkout Process:** Streamlined purchase flow with multiple payment options
- **Order Tracking:** Real-time updates on order status from processing to delivery
- **Profile Management:** Update personal details, addresses, and preferred payment methods

### For Vendors
- **Dashboard Overview:** Sales metrics, earnings summary, and key business insights
- **Product Management:** Comprehensive tools to add, edit, and remove product listings
- **Order Processing:** Manage customer orders through fulfillment stages
- **Financial Tools:** Track earnings and withdraw funds to external accounts
- **Store Settings:** Customize business profile and operational parameters

### General Features
- **Role-Based Access:** Interface adapts completely based on account type (customer/vendor)
- **Authentication System:** Complete sign-in/sign-up flow with password recovery
- **Persistent Settings:** User preferences and data maintained across sessions

---

## Project Structure

The project uses **file-based routing** via [Expo Router](https://docs.expo.dev/router/introduction/), organizing screens and navigation by directory structure. Here's a comprehensive breakdown:

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

---

## Technical Stack

- **Languages:** 
  - TypeScript (primary)
  - JavaScript (where needed)

- **Frameworks:** 
  - React Native
  - Expo
  - Expo Router (for file-based navigation)

- **UI Libraries:** 
  - [lucide-react-native](https://lucide.dev/icons/) for vector icons
  - [@expo-google-fonts/poppins](https://github.com/expo/google-fonts) for typography

- **State Management:** 
  - React Context API

- **Form Management:** 
  - [Formik](https://formik.org/) for form handling
  - [Yup](https://github.com/jquense/yup) for validation schemas

- **Additional Tools & Libraries:** 
  - [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) for camera/gallery access
  - [lottie-react-native](https://github.com/lottie-react-native/lottie-react-native) for animations
  - [expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/) for status bar management
  - [expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/) for splash screen configuration

---

## Authentication & User Roles

### User Types and Access Control

GreenCart implements a comprehensive role-based access control system that determines which parts of the application a user can access based on their account type.

### Authentication Flow

1. **Welcome Screen**: Entry point with options to sign in or register
2. **Registration**: Users select either customer or vendor role during signup
3. **Login**: Email/password authentication with role verification
4. **Password Recovery**: Complete flow including OTP verification
5. **Role-Based Redirection**: After authentication, users are directed to the appropriate interface (customer tabs or vendor dashboard)

### Hardcoded Users & Roles (Development Phase)

- **User Data:** Currently stored in `data/mockDatabase.ts` 
- **User Types:** Defined in `types/user.ts` as:
  ```typescript
  type UserRole = 'customer' | 'vendor';
  
  interface User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    // Additional properties...
  }
  ```

### Authentication Context

The `AuthContext.tsx` provides a central authentication state that:
- Manages login/logout operations
- Stores current user information
- Exposes user role for conditional rendering
- Handles session persistence

---

## Pages & Navigation

### Authentication Screens (`(auth)/`)

- **welcome.tsx**: Entry point with app introduction and auth options
- **signin.tsx**: Email/password login with validation
- **signup.tsx**: Registration form with role selection
- **forgot-password.tsx**: Password recovery initiation
- **otp-verification.tsx**: One-time password validation
- **new-password.tsx**: Password reset form
- **success.tsx**: Confirmation screen for successful operations

### Customer Interface (`(tabs)/`)

- **index.tsx (Home)**: Dashboard with featured products, recent orders, and promotions
- **browse.tsx**: Product catalog with search, filters, and categories
- **cart.tsx**: Shopping cart with quantity management, price calculation, and checkout flow
- **profile/**: User settings and account management
  - **index.tsx**: Main profile dashboard
  - **edit.tsx**: Personal information editing
  - **address.tsx**: Delivery address management
  - **language.tsx**: App language preferences
  - **payment.tsx**: Payment method management
  - **orders.tsx**: Order history and tracking

### Vendor Dashboard (`(vendor)/`)

- **index.tsx**: Business overview with earnings, sales metrics, and quick actions
- **products.tsx**: Product inventory management (CRUD operations)
- **profile/**: Business account settings
  - **index.tsx**: Vendor profile overview
  - **edit.tsx**: Business information editing
  - **address.tsx**: Business location management
  - **language.tsx**: Language preferences
  - **payment.tsx**: Payment receiving methods and withdrawal options

---

## Installation & Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, for advanced usage)
- For mobile testing:
  - [Android Studio](https://developer.android.com/studio) with emulator setup (for Android)
  - [Xcode](https://developer.apple.com/xcode/) with simulator (for iOS, macOS only)
  - [Expo Go](https://expo.dev/go) installed on a physical device

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lycan-Xx/natural-wellness-e-commerce.git
   cd natural-wellness-e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Launch with Expo Go on your device**
   - Install the Expo Go app on your iOS or Android device
   - Make sure your phone is on the same WiFi network as your computer
   - Scan the QR code displayed in the terminal with:
     - iOS: Use the Camera app
     - Android: Use the Expo Go app's QR scanner

   **Important Expo Go Version Note**: Make sure your Expo Go app version is compatible with the project's Expo SDK version. If you have issues, try different versions of Expo Go from the app store.

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Expo development server |
| `npm run android` | Start on Android emulator |
| `npm run ios` | Start on iOS simulator (macOS only) |
| `npm run web` | Start on web browser |
| `npm run lint` | Run ESLint for code quality |
| `npm run reset-project` | Reset to a clean project structure |

---

## How I Built It

GreenCart was developed with a component-driven, mobile-first approach:

1. **Initial Setup**: Created the project using `create-expo-app` with TypeScript template

2. **Architecture Planning**: Mapped out the application structure with a focus on:
   - Separation of concerns
   - Reusable components
   - Intuitive navigation
   - Role-based access control

3. **UI Component Library**: Developed a consistent design system with:
   - Typography using Google Fonts (Poppins)
   - Color palette defined in `constants/Colors.tsx`
   - Reusable UI components for buttons, inputs, cards, etc.

4. **Navigation Structure**: Implemented file-based routing with Expo Router:
   - Created distinct navigation groups for auth, customer, and vendor screens
   - Configured layouts for each section with appropriate navigation options
   - Implemented conditional routing based on authentication status and user role

5. **State Management**: Set up React Context for global state:
   - `AuthContext` for user authentication and role management
   - `CartContext` for shopping cart persistence and operations

6. **Screen Development**: Built out individual screens following the planned structure:
   - Authentication flows
   - Customer browsing and shopping experience
   - Vendor dashboard and product management
   - User profiles and settings

7. **Mock Data Integration**: Created placeholder data for development:
   - Sample product catalog in `data/products.ts`
   - User accounts and orders in `data/mockDatabase.ts`

8. **Testing & Refinement**: Iteratively tested and improved the application:
   - Cross-platform testing on Android and iOS
   - UI/UX refinements based on usability testing
   - Performance optimizations

---

## Challenges Faced

Development of GreenCart came with several significant challenges:

### 1. Dependency Inconsistency

Managing compatible packages within the React Native ecosystem proved challenging. Ensuring that all dependencies worked together without conflicts required careful version management and occasional compromises in feature implementation.

### 2. Expo Go Version Compatibility

One of the most frustrating issues encountered was with the Expo Go app. After installing the latest version from the Play Store, the application repeatedly failed to run. After extensive troubleshooting, I discovered that my project used SDK 52, while the latest Expo Go supported SDK 53. Downgrading to a compatible version resolved the issue but highlighted the importance of version alignment in the development environment.

### 3. Component Reusability Limitations

While I aimed for maximum component reuse, certain UI elements required specific behaviors or appearances depending on their context. This necessitated creating custom variations rather than relying on a single implementation with props, increasing the complexity of the component library.

### 4. Navigation State Management

Implementing role-based navigation while maintaining user state across different sections of the app proved complex. Ensuring that authenticated users only accessed appropriate sections required careful planning of the navigation architecture and state management.

### 5. Cross-Platform Consistency

Maintaining a consistent user experience across iOS and Android platforms required additional effort, as certain components behaved differently on each platform. This required platform-specific adjustments while maintaining a unified codebase.

---

## Accomplishments

Despite the challenges faced, GreenCart has achieved several significant milestones:

### 1. Fully Working Authentication Flow

Implemented a complete authentication system with role-based access control:
- User registration with role selection
- Secure login with validation
- Password recovery with OTP verification
- Automatic redirection based on user role

### 2. Comprehensive Shopping Experience

Delivered a complete customer journey:
- Product browsing with categories and search
- Detailed product views with specifications
- Cart management with quantity controls
- Checkout process with delivery options

### 3. Payment Method Management

Built a robust payment system:
- Credit/debit card saving with CRUD operations
- Multiple payment options during checkout
- Secure handling of payment information

### 4. Vendor Product Management

Created tools for sellers to manage their inventory:
- Product creation with image upload
- Inventory management dashboard
- Product editing and removal capabilities
- Stock level tracking

### 5. Financial Management for Vendors

Implemented earnings tracking and withdrawal functionality:
- Earnings dashboard with transaction history
- Withdrawal request system
- Payment method management for receiving funds

These accomplishments have resulted in a functional dual-role application that delivers value to both customers and vendors through a single, unified platform.

---

## Lessons Learned

This project provided valuable insights that will inform future development:

### 1. Start with Compatible Dependencies

**Key Takeaway**: Ensure all dependencies are compatible before beginning development. Starting with a solid foundation of correct package versions prevents countless hours of troubleshooting later.

### 2. Version Control is Critical

Regular commits with descriptive messages made it easier to track changes and revert when necessary. This practice was invaluable when resolving conflicts between dependencies.

### 3. Plan Component Reusability Carefully

Design truly reusable components requires forward thinking about all potential use cases. What works in one context may need modification in another, so building with flexibility in mind is essential.

### 4. Test Across Multiple Devices Early

Testing on various devices from the early stages helps identify platform-specific issues before they become deeply embedded in the codebase.

### 5. Prioritize Navigation Architecture

In multi-role applications, careful consideration of navigation patterns and access controls from the earliest design phases saves significant refactoring later.

---

## Future Enhancements

While GreenCart already delivers a solid experience, several enhancements are planned for future iterations:

### 1. Enhanced Order Tracking

- Real-time status updates for each purchased item
- GPS tracking integration for delivery
- Delivery time estimations
- Push notifications for status changes

### 2. Improved Data Synchronization

- Seamless data sharing between components
- Automatic population of saved addresses during checkout
- Persistent user preferences across sessions
- Cross-device synchronization

### 3. Backend Implementation

- Replace mock data with real API integration
- User authentication with JWT
- Cloud database for products and orders
- Secure payment processing

### 4. Additional Features

- Customer reviews and ratings
- Product recommendations based on purchase history
- Wishlist functionality
- Social sharing integration
- In-app messaging between customers and vendors

### 5. Performance Optimizations

- Lazy loading for product images
- Virtualized lists for smooth scrolling
- Optimized state management
- Reduced bundle size

---

## Contributing

Contributions to GreenCart are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style conventions and includes appropriate tests.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contact

Muhammad Suleiman Bello - msbello514@gmail.com

Project Link: [https://github.com/Lycan-Xx/natural-wellness-e-commerce](https://github.com/Lycan-Xx/natural-wellness-e-commerce)

---

*Thank you for checking out GreenCart! Happy shopping and selling!*