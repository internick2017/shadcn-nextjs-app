# Project Structure Documentation

This document describes the organized and clean project structure that's ready for backend implementation.

## 📁 Directory Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Main dashboard
│   ├── payments/          # Payment management
│   ├── users/             # User management
│   └── user/[id]/         # Individual user profiles
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── common/            # Shared components
│   └── user/              # User-specific components
├── types/                 # TypeScript type definitions
│   ├── index.ts           # All type exports
│   ├── user.ts            # User-related types
│   ├── payment.ts         # Payment & transaction types
│   ├── todo.ts            # Todo item types
│   └── card.ts            # Card & project types
├── data/                  # Mock data (development)
│   ├── index.ts           # All data exports
│   ├── users.ts           # User mock data
│   ├── payments.ts        # Payment mock data
│   ├── transactions.ts    # Transaction mock data
│   ├── todos.ts           # Todo mock data
│   └── projects.ts        # Project mock data
├── services/              # API layer
│   ├── index.ts           # All service exports
│   ├── api.ts             # Base API client
│   ├── users.ts           # User service
│   ├── payments.ts        # Payment service
│   ├── todos.ts           # Todo service
│   └── projects.ts        # Project service
├── utils/                 # Utility functions
│   ├── index.ts           # All utility exports
│   ├── formatters.ts      # Data formatting utilities
│   └── validators.ts      # Validation utilities
├── constants/             # Application constants
│   └── index.ts           # Status types, categories, etc.
└── hooks/                 # Custom React hooks
    └── use-mobile.ts      # Mobile detection hook
```

## 🏗️ Architecture Overview

### 1. Type System (`/types`)
- **Centralized**: All TypeScript interfaces and types in one location
- **Comprehensive**: Complete type definitions for all entities
- **Backward Compatible**: Re-exports maintain existing imports
- **Extensible**: Easy to add new types for future features

Key files:
- `user.ts` - User, UserSummary, UserStats, etc.
- `payment.ts` - Payment, Transaction, Customer, Merchant
- `todo.ts` - TodoItem with priority and status types
- `card.ts` - CardItem, Project with comprehensive metadata

### 2. Mock Data (`/data`)
- **Realistic**: Rich, realistic sample data
- **Consistent**: Cross-referenced data between entities
- **Helper Functions**: Utility functions for data retrieval
- **Easy Replacement**: Simple to replace with real API calls

Features:
- Linked user data across all modules
- Comprehensive user profiles with performance data
- Realistic payment and transaction history
- Project data with assignees and progress tracking

### 3. API Layer (`/services`)
- **Mock/API Toggle**: Environment-controlled data source
- **Consistent Interface**: Same API for mock and real data
- **Error Handling**: Comprehensive error management
- **Pagination**: Built-in pagination support
- **Filtering**: Advanced filtering capabilities

Service pattern:
```typescript
class UserService {
  private mockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false'
  
  async getUsers(params?) {
    if (this.mockMode) {
      // Return filtered mock data
    }
    // Make real API call
  }
}
```

### 4. Utilities (`/utils`)
- **Formatters**: Currency, date, file size formatting
- **Validators**: Form and data validation
- **Type Guards**: Runtime type checking
- **Helper Functions**: Common utility operations

### 5. Constants (`/constants`)
- **Status Enums**: All status types as constants
- **Categories**: Predefined categories and options
- **Configuration**: Application-wide constants

## 🚀 Backend Integration Ready

### Environment Configuration
The project uses environment variables to toggle between mock and real data:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true|false
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### API Client
Ready-to-use API client with:
- Request/response interceptors
- Error handling
- Timeout management
- Query parameter handling
- Type-safe responses

### Service Layer
Each entity has a service class with methods like:
- `getAll(params)` - List with filtering/pagination
- `getById(id)` - Single item retrieval
- `create(data)` - Create new item
- `update(id, data)` - Update existing item
- `delete(id)` - Delete item

## 🔄 Migration Path

### From Mock to Real Backend

1. **Update Environment Variable**:
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=false
   ```

2. **Configure API Base URL**:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api.com/api
   ```

3. **No Code Changes Required**: The service layer automatically switches to real API calls.

### Component Updates
All components are already using the centralized services:
```typescript
import { userService } from '@/services'

// This works with both mock and real data
const users = await userService.getUsers({ status: 'active' })
```

## 🧪 Development Benefits

### Type Safety
- Complete TypeScript coverage
- Intellisense support
- Compile-time error checking
- Consistent data structures

### Developer Experience
- Hot reload with mock data
- No backend dependency for frontend development
- Realistic data for testing UI components
- Easy to add new mock data

### Testing Ready
- Isolated data layer
- Mockable services
- Predictable data structures
- Helper functions for test data

## 📋 Next Steps for Backend Implementation

1. **Set up your backend API** with matching endpoints:
   - `GET /api/users` - List users
   - `GET /api/users/:id` - Get user by ID
   - `POST /api/users` - Create user
   - `PUT /api/users/:id` - Update user
   - `DELETE /api/users/:id` - Delete user
   - Similar patterns for payments, projects, todos

2. **Match the response format**:
   ```typescript
   interface ApiResponse<T> {
     data: T
     success: boolean
     message?: string
     errors?: string[]
     meta?: { page, limit, total, totalPages }
   }
   ```

3. **Update environment variables** to point to your backend

4. **Test the integration** - the frontend will automatically switch to real data

## 🎯 Key Features

- ✅ **Clean Architecture**: Separation of concerns
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Mock Data**: Rich, realistic sample data
- ✅ **API Ready**: Service layer ready for backend
- ✅ **Extensible**: Easy to add new features
- ✅ **Maintainable**: Well-organized code structure
- ✅ **Documentation**: Comprehensive inline documentation
- ✅ **Testing Friendly**: Isolated, mockable components

This structure provides a solid foundation for scaling the application and integrating with a real backend when ready. 