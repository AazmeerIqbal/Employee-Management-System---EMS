# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Database Configuration (if needed for environment variables)
DB_USER=sa
DB_PASSWORD=test
DB_SERVER=AZMEER
DB_NAME=HR
DB_PORT=1433
```

## Database Setup

Make sure your SQL Server database has a `User_mst` table with the following structure:

```sql
CREATE TABLE User_mst (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    UserName VARCHAR(50) NOT NULL,
    UserPassword VARCHAR(255) NOT NULL,
    FullName VARCHAR(100),
    Email VARCHAR(100),
    Gender VARCHAR(10),
    CompanyId INT,
    RoleId INT,
    ImagePath VARCHAR(255)
);
```

## How Authentication Works

1. **Login Flow**:

   - User enters username and password on `/login` page
   - NextAuth validates credentials against the database
   - If valid, user is redirected to `/employees`
   - If invalid, error toast is shown

2. **Session Management**:

   - NextAuth handles JWT tokens and sessions
   - User session is maintained across page refreshes
   - Logout clears the session and redirects to login

3. **Route Protection**:
   - Middleware protects all dashboard routes
   - Unauthenticated users are redirected to login
   - ProtectedRoute component handles client-side protection

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/login`
3. Use valid database credentials to test login
4. You should be redirected to `/employees` on successful login

## Troubleshooting

- Make sure your database is running and accessible
- Check that the `User_mst` table exists with correct structure
- Verify environment variables are set correctly
- Check browser console for any errors
