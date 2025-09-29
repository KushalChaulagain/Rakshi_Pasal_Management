# Liquor Store Management System

A comprehensive, locally-deployed liquor store management system with a .NET Core backend and Electron desktop frontend.

## Features

- **Inventory Management**: Product catalog, stock tracking, barcode scanning, supplier management
- **Point of Sale (POS)**: Sales transactions, customer management, age verification
- **Reporting & Analytics**: Sales reports, profitability analysis, trend analysis
- **System Administration**: User management, role-based access control, audit trails

## Tech Stack

### Frontend
- **Electron** - Desktop application wrapper
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Router** - Navigation

### Backend
- **.NET Core 8** - RESTful API
- **Entity Framework Core** - ORM
- **SQL Server Express / SQLite** - Database
- **JWT Authentication** - Security
- **Serilog** - Logging

## Prerequisites

- **Node.js** 18+ and npm
- **.NET 8 SDK**
- **SQL Server Express** or **SQLite**

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Liquor_Management_System
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Setup Backend
```bash
cd Backend
dotnet restore
dotnet ef database update
cd ..
```

### 4. Configure Environment
Create a `.env` file in the root:
```env
VITE_API_URL=http://localhost:5000/api
```

## Development

### Run Frontend (Electron + React)
```bash
npm run dev
```

This will:
1. Start Vite dev server on `http://localhost:5173`
2. Launch Electron app that loads the dev server

### Run Backend (.NET API)
```bash
cd Backend
dotnet run
```

The API will run on `http://localhost:5000`

## Building for Production

### Build Frontend
```bash
npm run build
```

### Build Windows Installer
```bash
npm run build:win
```

### Build macOS App
```bash
npm run build:mac
```

### Build Linux AppImage
```bash
npm run build:linux
```

## Project Structure

```
Liquor_Management_System/
├── electron/               # Electron main process
│   ├── main.ts
│   └── preload.ts
├── src/                    # React frontend
│   ├── pages/              # Page components
│   ├── components/         # Reusable components
│   ├── services/           # API services
│   ├── hooks/              # Custom hooks
│   ├── stores/             # State management
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities
├── Backend/                # .NET Core API
│   ├── LiquorStore.API/
│   ├── LiquorStore.Core/
│   ├── LiquorStore.Infrastructure/
│   └── LiquorStore.Services/
├── .cursor/rules/          # Cursor AI rules
└── package.json
```

## Key Features

### Dashboard
- Today's sales, inventory value, transactions
- Weekly sales chart
- Top selling products
- Low stock alerts
- Recent transactions

### Point of Sale
- Quick product search and barcode scanning
- Category-based browsing
- Shopping cart
- Age verification prompts
- Multiple payment methods

### Inventory Management
- Product catalog with detailed information
- Stock level tracking
- Low stock alerts with priority levels
- Supplier management
- Barcode support

### Reports & Analytics
- Sales reports (daily, weekly, monthly, yearly)
- Profitability analysis
- Inventory turnover metrics
- Trend analysis and forecasting
- Export to PDF/Excel

## Configuration

### Backend API URL
Update `src/services/api.ts` or `.env` file:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Database Connection
Update `Backend/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=LiquorStore;Trusted_Connection=true;"
  }
}
```

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
