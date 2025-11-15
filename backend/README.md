# User Post Manager Backend

A RESTful API backend for user and post management, built with Node.js, TypeScript, Express.js, and SQLite3. This server provides comprehensive CRUD operations for users and posts, with address management, proper error handling, and comprehensive API documentation.

## Features

- **User Management**: CRUD operations for users with address information
- **Post Management**: Full CRUD for posts associated with users
- **Pagination**: Efficient paginated responses for large datasets
- **Error Handling**: Comprehensive validation and error responses
- **SQLite Database**: Lightweight, file-based database storage
- **Type Safety**: Full TypeScript implementation for reliability
- **Docker Support**: Containerized deployment with Docker Compose

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **TypeScript** - type-safe JavaScript development
- **Express.js** - web framework for APIs
- **SQLite3** - embedded SQL database
- **Jest** - testing framework
- **Docker** - containerization
- **Body-parser** - JSON request parsing middleware

## API Endpoints

### Users
- `GET /users` - Get paginated users with addresses
- `GET /users/count` - Get total user count

### Posts
- `GET /posts?userId={id}` - Get posts for a user
- `POST /posts` - Create a new post
- `DELETE /posts/{id}` - Delete a post by ID

## Local Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone and navigate**
   ```bash
   git clone https://github.com/AllStackDev1/user-post-manager-server.git
   cd user-post-manager-server/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Access at `http://localhost:3001`

### Alternative Local Commands

- **Production mode**: `npm start`
- **Single run dev**: `npm run dev:once`
- **Build**: `npm run build`

## Docker Setup

To avoid interfering with your existing setup, use Docker:

1. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the API**
   The server will be available at `http://localhost:8000`

## Running Tests

```bash
# Run all tests
npm test

# Run tests with detailed output
npm run test -- --verbose
```

Tests cover API endpoints with mocked database interactions and validation scenarios.

## Project Structure

```
backend/
├── src/
│   ├── db/           # Database connection and queries
│   │   ├── users/    # User-related database operations
│   │   └── posts/    # Post-related database operations
│   ├── routes/       # API route handlers
│   ├── types/        # Shared TypeScript interfaces
│   └── index.ts      # Main server entry point
├── __tests__/        # API integration tests
├── config/          # Environment configurations
├── Dockerfile       # Docker container configuration
├── docker-compose.yml # Multi-container setup
└── data.db         # SQLite database file
```

## Configuration

The server uses `config` package for environment settings:

- **Default port**: 3001 (local), 8000 (Docker)
- **Database**: SQLite file-based (`data.db`)
- **CORS**: Enabled for frontend integration

## Development

- **Hot reloading in development**: Uses nodemon for automatic restarts
- **Type checking**: TypeScript compilation with strict mode
- **Database**: SQLite3 requires no additional setup
- **Error handling**: Comprehensive try-catch blocks for API stability

## Contributing

1. Follow the existing TypeScript structure and naming conventions
2. Add tests for new features
3. Update API documentation
4. Ensure Docker builds work correctly
