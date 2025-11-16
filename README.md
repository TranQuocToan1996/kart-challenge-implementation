# Cart Challenge - E-commerce Shopping Cart

A modern e-commerce shopping cart application built with React, TypeScript, and Vite. Features product listing, cart management, discount codes, and order placement.
Github page URL: https://TranQuocToan1996.github.io/kart-challenge-implementation/

Origin requirements: https://github.com/oolio-group/kart-challenge 
Fork: https://github.com/TranQuocToan1996/kart-challenge

## Features

- 🛒 Shopping cart functionality with add/remove/update quantities
- 🎫 Discount code support (HAPPYHOURS, BUYGETONE)
- 📦 Product listing with pagination
- ✅ Order confirmation page
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 🔄 State management with Zustand
- 📡 API integration with React Query
- 🖼️ Lazy image loading for better performance

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Query** - Data fetching and caching
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TranQuocToan1996/kart-challenge-implementation
cd kart-challenge-implementation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
```env
VITE_API_BASE_URL=https://orderfoodonline.deno.dev/api
VITE_API_KEY=your_api_key_here
```

   **Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

### Running the Project

#### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

#### Production Build

Build the project for production:
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

#### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Other Commands

- **Lint code:**
```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # React components
│   ├── Cart.tsx
│   ├── CartItem.tsx
│   ├── DiscountCodeInput.tsx
│   ├── LazyImage.tsx
│   ├── Loading.tsx
│   ├── OrderConfirmation.tsx
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   └── QuantitySelector.tsx
├── pages/         # Page components
│   └── HomePage.tsx
├── hooks/         # Custom React hooks
│   ├── useOrder.ts
│   └── useProducts.ts
├── services/      # API services
│   └── api.ts
├── store/         # State management (Zustand)
│   └── cartStore.ts
├── types/         # TypeScript type definitions
│   └── index.ts
├── utils/         # Utility functions
│   └── discount.ts
└── constants/     # Constants and configuration
    └── index.ts
```

## API Integration

The application integrates with an external API for product data and order placement. The API configuration can be set via environment variables:

- `VITE_API_BASE_URL` - Base URL for the API (defaults to production URL)
- `VITE_API_KEY` - API key for authenticated requests

The app includes fallback functionality - if the API is unavailable, it will use local product data from `public/product.json`.

## Discount Codes

The application supports the following discount codes:

- **HAPPYHOURS** - 18% discount on the entire order
- **BUYGETONE** - Buy one get one free (applied to eligible items)

## TODO Checklist

### Features & Functionality
- [ ] Add toast notifications - Show success/error messages for cart actions

### Design & UI/UX
- [ ] Add animations/transitions - Smooth transitions for cart updates, modal opens
- [ ] Add hover states - Ensure all interactive elements have proper hover effects

### Performance Monitoring & Analytics
- [ ] Add performance monitoring - Track Core Web Vitals (LCP, FID, CLS)
- [ ] Add error tracking - Integrate Sentry or similar for error monitoring
- [ ] Add analytics - Track user interactions (cart additions, orders placed)


### DevOps & CI/CD
- [ ] Set up CI/CD pipeline - GitHub Actions for linting, testing, building
- [ ] Add pre-commit hooks - Run linting and tests before commits
- [ ] Add build optimization - Code splitting, tree shaking, minification
- [ ] Set up deployment Github page

## License

This project is part of a coding challenge implementation.
