# Troubleshooting Guide

## Issue: Configuration Error & Missing Sidebar Pages

### 🔧 Step 1: Create Environment File

Run this command to create the required environment file:

```bash
node create-env.js
```

Or manually create `.env.local` in your project root:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
```

### 🔧 Step 2: Generate a Secure Secret

Generate a secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Replace `your-secret-key-here-change-this-in-production` with the generated string.

### 🔧 Step 3: Restart Development Server

```bash
npm run dev
```

### 🔧 Step 4: Check Database Connection

Ensure your SQL Server database is running and accessible with the credentials in `utils/database.js`.

### 🔧 Step 5: Verify User Table Structure

Make sure your `User_mst` table has the correct structure:

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

### 🔧 Step 6: Test with Sample Data

Insert a test user:

```sql
INSERT INTO User_mst (UserName, UserPassword, FullName, Email, RoleId)
VALUES ('admin', 'admin123', 'Admin User', 'admin@example.com', 1);
```

Note: The password will be encrypted automatically by the application.

### 🔍 Debugging Steps

1. **Check Browser Console**: Look for any JavaScript errors
2. **Check Server Logs**: Look for NextAuth debugging messages
3. **Check Network Tab**: Verify API calls to `/api/auth/signin`

### 🎯 Expected Behavior

After successful login:

- You should be redirected to `/employees`
- Sidebar should show all menu items
- User name should appear in the navbar
- No "Configuration" error in URL

### 🚨 Common Issues

1. **Configuration Error**: Missing `NEXTAUTH_SECRET` environment variable
2. **Empty Sidebar**: User permissions not set correctly
3. **Database Connection**: SQL Server not running or wrong credentials
4. **Password Encryption**: Password not matching encrypted version in database

### 📞 Need Help?

If issues persist:

1. Check the browser console for errors
2. Check the terminal/server logs for NextAuth debugging messages
3. Verify database connectivity
4. Ensure environment variables are set correctly
