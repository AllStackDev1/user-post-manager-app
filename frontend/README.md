# User Post Manager Frontend

A modern React application for managing users and their posts, built with TypeScript and shadcn/ui components. This frontend provides a clean, responsive interface for viewing users in a paginated table, exploring individual user posts, and managing post content.

## Features

- **User Management**: View users in a paginated table with address information
- **Post Management**: Browse, create, and delete posts for each user
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Type-Safe**: Fully typed with TypeScript for better development experience
- **State Management**: Efficient data fetching with React Query
- **Component Library**: UI components built with shadcn/ui and Radix primitives

## Technologies Used

- **React** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **React Query** - Data fetching and state management
- **React Router** - Client-side routing
- **shadcn/ui** - Accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Testing Library** - Component testing utilities

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AllStackDev1/user-post-manager.git
   cd user-post-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file and set your API endpoint:
   ```
   VITE_API_BASE_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8080`

## Running Tests

```bash
# Run all tests
npm test

# Run tests with interactive UI
npm run test:ui

# Run tests in CI mode (non-interactive)
npm run test -- --run
```

## Live Demo

The application is deployed and available at: https://user-post-manager-vert.vercel.app/

## API Integration

This frontend communicates with a Node.js/TypeScript backend API that provides:

- `GET /users` - Paginated user list with address information
- `GET /posts?userId={id}` - User's posts
- `POST /posts` - Create new post
- `DELETE /posts/{id}` - Delete post

## Project Structure

```
src/
├── components/       # Reusable UI components
├── hooks/            # Hooks
├── pages/            # Route components
├── services/         # API integration
├── types/            # TypeScript type definitions
├── lib/              # Utility functions
└── tests/            # Test files
```

## Development

- Built with Vite for fast development and optimized builds
- ESLint for code quality
- Component testing with Vitest and React Testing Library
- Follows React best practices with hooks and functional components
