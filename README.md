# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


TODO checklist
Features & Functionality
[ ] Add toast notifications - Show success/error messages for cart actions
Design & UI/UX
[ ] Match Figma design exactly - Review design.fig and fix spacing, colors, typography
[ ] Add animations/transitions - Smooth transitions for cart updates, modal opens
[ ] Improve mobile experience - Test and optimize for mobile devices (375px and below)
[ ] Add hover states - Ensure all interactive elements have proper hover effects
[ ] Fix responsive breakpoints - Test across all screen sizes (320px to large screens)
Performance Monitoring & Analytics
[ ] Add performance monitoring - Track Core Web Vitals (LCP, FID, CLS)
[ ] Add error tracking - Integrate Sentry or similar for error monitoring
[ ] Add analytics - Track user interactions (cart additions, orders placed)
Documentation
[ ] Update README.md - Replace template content with project-specific documentation
[ ] Add setup instructions - Document how to run, build, and deploy
[ ] Add architecture documentation - Document folder structure and design decisions
Security
[ ] Move API key to environment variables - Don't hardcode API keys in source code
[ ] Add input sanitization - Sanitize user inputs (discount codes, quantities)
[ ] Add rate limiting on client - Prevent excessive API calls
[ ] Validate API responses - Use Zod or similar to validate API response schemas
DevOps & CI/CD
[ ] Set up CI/CD pipeline - GitHub Actions for linting, testing, building
[ ] Add pre-commit hooks - Run linting and tests before commits
[ ] Add build optimization - Code splitting, tree shaking, minification
[ ] Set up deployment Github page