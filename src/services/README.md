# Backend Integration

This directory contains services for integrating with the Gemstone backend API. The implementation follows the patterns and best practices described in the Gemstone Backend Integration Documentation.

## Architecture

The backend integration is structured as follows:

```
src/
├── services/           # API services
│   ├── apiService.ts   # Generic API service for CRUD operations
│   ├── authService.ts  # Authentication service
│   ├── productService.ts # Example resource service
│   └── index.ts        # Service exports
├── types/
│   └── api/            # API type definitions
│       ├── auth.types.ts   # Authentication types
│       ├── common.types.ts # Common API types
│       ├── product.types.ts # Example resource types
│       └── index.ts    # Type exports
├── utils/
│   ├── api.ts          # API client with JWT handling
│   └── errorHandler.ts # API error handling utilities
└── hooks/
    ├── useAuth.ts      # Authentication hook
    └── index.ts        # Hook exports
```

## API Client

The API client (`src/utils/api.ts`) is built with Axios and includes:

- JWT token management (access and refresh tokens)
- Automatic token refresh on 401 errors
- Request/response interceptors
- Error handling

## Authentication

Authentication is implemented using JWT tokens as described in the documentation:

- `authService.ts` provides methods for registration, login, logout, etc.
- `useAuth.ts` is a React hook that makes it easy to use authentication in components

## Services

Services follow a consistent pattern:

1. **Generic API Service**: `ApiService` provides common CRUD operations for any resource
2. **Resource-specific Services**: Extend `ApiService` for specific resources (e.g., `ProductService`)

## Type Safety

All API interactions are strongly typed using TypeScript interfaces:

- Request payloads
- Response structures
- Error handling

## Error Handling

Comprehensive error handling is implemented in `errorHandler.ts`:

- Standardized error format
- Type-based error categorization
- User-friendly error messages

## Usage Examples

### Authentication

```typescript
import { useAuth } from '../hooks';

// In a component
const { login, user, loading, error } = useAuth();

// Login
const handleLogin = async () => {
  const success = await login({ username: 'user', password: 'pass' });
  if (success) {
    // Navigate to dashboard
  }
};
```

### API Requests

```typescript
import { productService } from '../services';

// Get all products (paginated)
const getProducts = async () => {
  try {
    const response = await productService.getAll();
    return response.results;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return [];
  }
};

// Get a specific product
const getProduct = async (id: number) => {
  try {
    return await productService.getById(id);
  } catch (error) {
    console.error(`Failed to fetch product ${id}`, error);
    return null;
  }
};

// Create a new product
const createProduct = async (productData) => {
  try {
    return await productService.create(productData);
  } catch (error) {
    console.error('Failed to create product', error);
    throw error;
  }
};
```

## Security Considerations

- Tokens are stored in localStorage (for development)
- For production, consider more secure storage options
- All API requests use HTTPS
- Input validation is performed before sending to the API