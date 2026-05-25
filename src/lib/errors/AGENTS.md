# src/lib/errors - Error Handling Infrastructure

**Parent**: [AGENTS.md](../../../../AGENTS.md)

## OVERVIEW
Custom error classes and response wrappers used by all API route handlers. Central error pattern for the application.

## FILES

| File | Role |
|------|------|
| `AppError.ts` | Custom error class with status code, message, and optional details |
| `ApiResponse.ts` | Standardized JSON response wrapper (`success`/`data`/`error` shape) |
| `ErrorHandler.ts` | Top-level error catcher for API route handlers |
| `http-status.ts` | HTTP status code constants/enum |
| `index.ts` | Barrel export |

## CONVENTIONS
- PascalCase filenames (`AppError.ts`, `ApiResponse.ts`) — nonstandard for TS but consistent in this project
- Every API route wraps responses with `ApiResponse`
- `AppError` thrown in services/validations, caught by `ErrorHandler` in route handlers
- Status codes sourced from `http-status.ts` (not hardcoded numbers)

## USAGE PATTERN
```typescript
// Route handler
try {
  // ... logic
  return ApiResponse.success(data);
} catch (error) {
  return ErrorHandler.handle(error);
}
```

## ANTI-PATTERNS
- No centralized Express-style error middleware — `ErrorHandler` called per-handler
- `ApiResponse` used both as class and utility — inconsistent naming (PascalCase file, used as object)
- No typed error codes/categories beyond HTTP status
