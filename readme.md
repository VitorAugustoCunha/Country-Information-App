# Country Information App

A modern web application that displays information about countries, including their flags, borders, and population data. Built with Next.js 14 and Node.js.

## 🚀 Features

- List of all countries with their flags
- Detailed country information
- Population trends visualization
- Border countries navigation
- Responsive design
- Dark mode support
- Interactive data visualization
- Real-time data from multiple APIs

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Server Components
- Custom SVG Charts

### Backend
- Node.js
- Express.js
- TypeScript
- Axios

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
DATE_NAGER_API=https://date.nager.at/api/v3
COUNTRIES_NOW_API=https://countriesnow.space/api/v0.1
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🌐 API Endpoints

### GET /api/countries
Returns a list of all available countries.

Response example:
```json
[
  {
    "countryCode": "US",
    "name": "United States",
    "flagUrl": "https://..."
  }
]
```

### GET /api/countries/:code
Returns detailed information about a specific country.

Response example:
```json
{
  "commonName": "United States",
  "officialName": "United States of America",
  "countryCode": "US",
  "region": "North America",
  "borders": [...],
  "population": [...],
  "flagUrl": "https://..."
}
```

## 📱 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   └── types/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── services/
    │   └── types/
    └── package.json
```

## 🎨 Features and Components

### CountryCard
Displays basic country information with:
- Country flag
- Country name
- Country code
- Interactive hover effects

### PopulationChart
Custom SVG chart showing population trends with:
- Interactive data points
- Gradient area
- Responsive design
- Formatted axis labels

### Country Details Page
Shows comprehensive country information:
- Large flag display
- Official and common names
- Region information
- Border countries with flags
- Population trends visualization

## 🔍 Development Notes

### Code Style
- ESLint and Prettier configured
- TypeScript strict mode enabled
- Consistent component structure
- Custom hooks for data fetching

### Performance
- Server-side rendering for better SEO
- Image optimization with Next.js
- Memoized calculations for charts
- Efficient data caching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
