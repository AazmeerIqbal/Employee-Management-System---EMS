"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Implement your login logic here
    console.log("Login attempted with:", username, password);
    // Simulate login for demo
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard"); // Redirect to dashboard after login
    }, 1500);
  };

  return (
    <div className="max-w-md p-8 pb-5 mx-auto bg-white rounded-lg shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter your Username"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
            />
            <label
              htmlFor="remember-me"
              className="block ml-2 text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-cyan-600 hover:text-cyan-500"
            >
              Forgot password?
            </a>
          </div>
        </div> */}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-gradient-to-r from-cyan-500 to-pink-500 border border-transparent rounded-md shadow-sm hover:from-cyan-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">
              Don't have an account?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="/register"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-cyan-600 transition-colors bg-white border border-cyan-500 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Sign up
          </a>
        </div>
        {/* Additional text for branding */}
      </div>
      <div className="flex text-sm mt-4 font-medium text-center w-full justify-center">
        <span className="mr-1">Powered By </span>
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer text-transparent bg-clip-text font-bold">
          CLI-X
        </span>
      </div>
    </div>
  );
};

export default Login;
