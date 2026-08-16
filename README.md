# Super Market

A modern e-commerce supermarket application built with React, TypeScript, and Vite. This project provides a seamless shopping experience with product browsing, cart management, checkout, and order tracking features.

## Features

- 🛍️ **Product Browsing** - Browse products by categories with search functionality
- 🛒 **Shopping Cart** - Add/remove products with a drawer-based cart interface
- ❤️ **Wishlist** - Save favorite products for later
- 💳 **Checkout** - Complete purchase with order management
- 📦 **Order Tracking** - Track order status and delivery
- 👤 **User Profile** - Manage user account and preferences
- 📱 **Responsive Design** - Optimized for mobile and desktop devices
- 🎨 **Modern UI** - Beautiful Material-UI inspired components
- ⚡ **Fast Performance** - Built with Vite for optimal performance

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript & JavaScript
- **Build Tool**: Vite
- **Styling**: CSS
- **State Management**: Zustand
- **UI Components**: Custom components with React

## Project Structure

```
super_market/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── cart/           # Cart functionality
│   │   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   │   ├── product/        # Product components
│   │   ├── search/         # Search overlay
│   │   └── ui/             # UI elements (Toast, Loading)
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderTracking.jsx
│   │   ├── Wishlist.jsx
│   │   └── Profile.jsx
│   ├── store/              # Zustand store for state management
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Mock data and constants
│   ├── assets/             # Images and static files
│   ├── App.jsx
│   └── main.jsx
├── public/                 # Static files
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lalit1dash/super_market.git
   cd super_market
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run linter (if configured)

## State Management

The application uses Zustand for state management with the following stores:

- **useCartStore** - Manages shopping cart items
- **useWishlistStore** - Manages wishlist items
- **useCheckoutStore** - Manages checkout process
- **useUIStore** - Manages UI state (modals, notifications, etc.)

## Components

### Layout
- **Navbar** - Top navigation bar
- **Footer** - Footer component
- **BottomNavigation** - Mobile bottom navigation
- **PageTransition** - Page transition effects

### Features
- **ProductModal** - Product details modal
- **CartDrawer** - Shopping cart drawer
- **SearchOverlay** - Search interface
- **Toast** - Notification component
- **LoadingScreen** - Loading indicator

## Key Hooks

- **useMediaQuery** - Responsive design hook
- **useScrollPosition** - Track scroll position

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License

This project is open source and available under the MIT License.

## Author

Created by [lalit1dash](https://github.com/lalit1dash)

## Support

For support, please open an issue on the GitHub repository.

---

**Repository**: https://github.com/lalit1dash/super_market
