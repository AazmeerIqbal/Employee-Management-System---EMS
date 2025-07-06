import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB, closeConnection } from "../../../../utils/database";
import { encrypt } from "../../../../utils/Encryption";

const sql = require("mssql");

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        let pool;
        try {
          // Connect to the database
          pool = await connectToDB();

          // Encrypt password
          const encryptedPassword = encrypt(password);

          let query = `
            SELECT * FROM User_mst 
            WHERE UserName = @username 
            AND UserPassword = @password
          `;
          const result = await pool
            .request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, encryptedPassword)
            .query(query);

          // Check if user exists
          if (result.recordset.length > 0) {
            const user = result.recordset[0];
            console.log("Authenticated User:", user);

            // Ensure roleId is a number
            const roleId = parseInt(user.RoleId) || 2; // Default to 2 if not set

            const userData = {
              id: user.UserId,
              name: user.UserName,
              fullname: user.FullName,
              email: user.Email,
              gender: user.Gender,
              companyId: user.CompanyId,
              roleId: roleId,
              imagePath: user.ImagePath,
            };

            console.log("Returning user data:", userData);
            return userData;
          } else {
            console.log("No user found with provided credentials");
            throw new Error("Invalid username or password");
          }
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null; // Return null on error
        } finally {
          await closeConnection(); // Close the database connection
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - user data:", user);

        token.id = user.id;
        token.name = user.name;
        token.fullname = user.fullname;
        token.email = user.email;
        token.gender = user.gender;
        token.companyId = user.companyId;
        token.roleId = user.roleId;
        token.imagePath = user.imagePath;

        // Add permissions based on roleId (you can customize this logic)
        token.permissions =
          user.roleId === 1
            ? ["*"]
            : [
                "view_dashboard",
                "view_employees",
                "manage_employees",
                "view_attendance",
                "view_salary",
                "view_departments",
                "view_reports",
                "view_calendar",
                "view_settings",
              ];

        console.log("JWT callback - token permissions:", token.permissions);
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - token data:", token);

      session.user = {
        id: token.id,
        name: token.name,
        fullname: token.fullname,
        email: token.email,
        gender: token.gender,
        companyId: token.companyId,
        roleId: token.roleId,
        imagePath: token.imagePath,
        permissions: token.permissions,
      };

      console.log("Session callback - session user:", session.user);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
