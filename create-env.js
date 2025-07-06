const fs = require("fs");
const path = require("path");

const envContent = `# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Database Configuration (if needed for environment variables)
DB_USER=sa
DB_PASSWORD=test
DB_SERVER=AZMEER
DB_NAME=HR
DB_PORT=1433
`;

const envPath = path.join(__dirname, ".env.local");

try {
  fs.writeFileSync(envPath, envContent);
  console.log("✅ .env.local file created successfully!");
  console.log(
    "📝 Please update the NEXTAUTH_SECRET with a secure random string"
  );
  console.log(
    "🔧 You can generate one using: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
  );
} catch (error) {
  console.error("❌ Error creating .env.local file:", error.message);
}
