# Wealth Elite Dashboard

A comprehensive financial planning platform built with Next.js, featuring a responsive navbar with dark mode support, interactive charts, and various financial tools.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [API Routes](#api-routes)
- [Components](#components)
- [Styling](#styling)
- [Contributing](#contributing)

## ✨ Features

- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 📊 **Interactive Charts** - Financial data visualization
- 🔍 **Advanced Search** - Portfolio and asset search functionality
- 📈 **Financial Tools** - SIP calculator, goal planning, wealth reports
- 🔐 **Authentication Ready** - User management system
- 🎯 **Multi-category Navigation** - Insurance, Assets, Mutual funds, etc.
- 📋 **Client Management** - CRM integration
- 🎨 **Modern UI** - Clean and professional interface

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **Charts:** Chart.js / Recharts
- **State Management:** React Hooks
- **Deployment:** Vercel (recommended)

## 📁 Project Structure

```
wealth-elite-dashboard/
├── .next/                          # Next.js build output
├── app/                            # App Router directory
│   ├── api/                        # API routes
│   │   ├── aum/route.ts           # Assets Under Management API
│   │   ├── charts/route.ts        # Charts data API
│   │   ├── sip/route.ts           # SIP calculator API
│   │   └── stats/route.ts         # Statistics API
│   ├── components/                 # React components
│   │   ├── ClientsBubble.tsx      # Client analytics component
│   │   ├── MetricCard.tsx         # Metric display cards
│   │   ├── MonthlyMisChart.tsx    # Monthly MIS charts
│   │   ├── Navbar.tsx             # Navigation with dark mode
│   │   ├── SipBusinessChart.tsx   # SIP business charts
│   │   └── TimeFilterStatCard.tsx # Time-filtered statistics
│   ├── favicon.ico                # App favicon
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── public/                         # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── wealth-elite-logo.png      # Main logo
│   └── window.svg
├── node_modules/                   # Dependencies
├── package.json                    # Project dependencies
├── postcss.config.mjs             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** (for cloning the repository)

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/royanish0410/Financial-dashboard
   cd Financial-dashboard
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Set up environment variables (if needed)**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   # Add other environment variables as needed
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts development server on port 3000 |
| `npm run build` | Creates production build |
| `npm start` | Starts production server |
| `npm run lint` | Runs ESLint for code linting |
| `npm run type-check` | Runs TypeScript type checking |

## 🔗 API Routes

The application includes several API endpoints:

### Authentication & User Management
- `GET /api/aum` - Assets Under Management data
- `GET /api/stats` - Dashboard statistics
- `GET /api/charts` - Chart data for visualization
- `GET /api/sip` - SIP calculator endpoints

### Example API Usage

```typescript
// Fetch AUM data
const response = await fetch('/api/aum');
const aumData = await response.json();

// Fetch dashboard stats
const statsResponse = await fetch('/api/stats');
const stats = await statsResponse.json();
```

## 🧩 Components

### Navbar Component
- Responsive navigation with dropdown menus
- Dark/Light mode toggle
- Search functionality
- Mobile-optimized hamburger menu

```tsx
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div>
      <Navbar />
      {/* Your content */}
    </div>
  );
}
```

### Chart Components
- `MetricCard.tsx` - Display key metrics
- `MonthlyMisChart.tsx` - Monthly MIS visualization
- `SipBusinessChart.tsx` - SIP business analytics
- `ClientsBubble.tsx` - Client distribution charts

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:

- Custom color palette focused on red theme
- Dark mode support with `dark:` prefixes
- Responsive design utilities
- Custom component classes

### Tailwind Configuration
```javascript
postcss.config.mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;


## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

```bash
# Or deploy using Vercel CLI
npx vercel
```

### Deploy on Other Platforms

```bash
# Build the application
npm run build

# The 'out' or '.next' directory contains the built application
```

## 📱 Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge
- **Mobile browsers:** iOS Safari, Chrome Mobile
- **Minimum versions:** Chrome 90+, Firefox 88+, Safari 14+

## 🔧 Development Tips

1. **Hot Reload:** Changes are automatically reflected in development mode
2. **TypeScript:** All components are typed for better development experience
3. **ESLint:** Code quality is maintained with linting rules
4. **Responsive Testing:** Use browser dev tools to test different screen sizes

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@wealth-elite.com or create an issue in the GitHub repository.

---

**Happy Coding! 🚀**
