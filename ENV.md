# Environment Variables

This project uses environment variables for configuration. This document explains how to set up and use environment variables in the application.

## Setup

1. Copy the `.env.example` file to a new file called `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and update the values as needed for your environment.

## Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | The URL of the backend API | http://localhost:8000/api/v1 |
| VITE_ENABLE_AUTH | Enable/disable authentication features | true |
| VITE_ENABLE_ANALYTICS | Enable/disable analytics | false |
| VITE_APP_NAME | Application name | Gemstone |
| VITE_APP_VERSION | Application version | 0.1.0 |

## Environment-Specific Files

Vite supports different environment files for different environments:

- `.env` - Loaded in all environments
- `.env.local` - Loaded in all environments, ignored by git
- `.env.development` - Development environment only
- `.env.production` - Production environment only
- `.env.test` - Test environment only

You can create these files as needed for your different environments.

## Using Environment Variables in Code

Environment variables are accessible in your code using `import.meta.env`:

```typescript
// Access an environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// Check if a feature is enabled
const isAuthEnabled = import.meta.env.VITE_ENABLE_AUTH === 'true';

// Use in JSX
return (
  <div>
    <h1>{import.meta.env.VITE_APP_NAME}</h1>
    <p>Version: {import.meta.env.VITE_APP_VERSION}</p>
  </div>
);
```

## Type Safety

For better TypeScript support, you can extend the `ImportMeta` interface:

```typescript
// src/vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_AUTH: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Security Considerations

- Never commit sensitive information (like API keys or secrets) to version control
- Use `.env.local` for sensitive values (it's ignored by git by default)
- For production deployments, set environment variables through your hosting platform