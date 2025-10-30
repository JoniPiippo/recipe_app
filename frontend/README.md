# RecipeShare Frontend

A modern recipe sharing platform built with Next.js 16, React 19, and Tailwind CSS v4.

## Features

✨ **Core Features**

- Recipe browsing and discovery
- User authentication (login/register)
- Create and edit recipes
- Save favorite recipes
- Like and comment on recipes
- User profiles
- Meal planning
- Category filtering
- Search functionality

🎨 **UI/UX**

- Dark theme design
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Material Symbols icons
- Image optimization with Next.js Image

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS v4
- **Forms**: @tailwindcss/forms
- **Icons**: Material Symbols Outlined
- **Code Quality**: Biome (linting & formatting)
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 20.9.0 or higher
- npm, yarn, pnpm, or bun

## Installation

1. **Install dependencies**:

```bash
cd frontend
npm install
```

2. **Create environment file**:

```bash
cp .env.example .env.local
```

3. **Update `.env.local`**:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth/              # Authentication pages
│   │   ├── components/        # Shared components
│   │   ├── create/            # Create recipe page
│   │   ├── explore/           # Browse recipes page
│   │   ├── meal-plans/        # Meal planning page
│   │   ├── profile/           # User profile pages
│   │   ├── recipe/[id]/       # Recipe detail page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication context
│   └── lib/
│       └── api.ts             # API client
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## Key Components

### Authentication

- `AuthContext` - Global authentication state
- Login/Register form with validation
- Protected routes
- Token management

### API Client (`src/lib/api.ts`)

- Centralized API calls
- Automatic token handling
- Type-safe responses
- Error handling

### Pages

- **Home** - Recipe feed with social features
- **Explore** - Browse recipes with filters
- **Create** - Recipe creation form
- **Profile** - User profile and recipes
- **Recipe Detail** - Full recipe view with comments
- **Meal Plans** - Weekly meal planning

## Styling Guide

### Colors

```typescript
primary: "#f59e0b"        // Orange
background-dark: "#1f2937" // Dark gray
card-dark: "#374151"       // Medium gray
surface-dark: "#262626"    // Surface gray
text-main: "#f9fafb"       // White
text-secondary: "#d1d5db"  // Light gray
```

### Common Patterns

- Rounded corners: `rounded-xl` (1.5rem)
- Shadows: `shadow-sm`, `shadow-md`
- Transitions: `transition-all duration-200`
- Hover states: `hover:bg-primary/90`

## API Integration

The frontend expects a backend API at the URL specified in `NEXT_PUBLIC_API_URL`.

### Required Endpoints

#### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user

#### Recipes

- `GET /recipes` - List recipes (with filters)
- `GET /recipes/:id` - Get recipe details
- `POST /recipes` - Create recipe
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe

#### Interactions

- `POST /recipes/:id/like` - Like recipe
- `DELETE /recipes/:id/like` - Unlike recipe
- `POST /recipes/:id/save` - Save recipe
- `DELETE /recipes/:id/save` - Unsave recipe
- `GET /recipes/:id/comments` - Get comments
- `POST /recipes/:id/comments` - Add comment

See `src/lib/api.ts` for complete API client implementation.

## Environment Variables

| Variable              | Description     | Default                 |
| --------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## Building for Production

```bash
npm run build
npm start
```

The optimized production build will be created in `.next/`.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## Code Quality

This project uses Biome for code quality:

```bash
# Check code
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### API Connection Issues

- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running
- Check CORS configuration on backend

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
