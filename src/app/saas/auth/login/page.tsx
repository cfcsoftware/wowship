"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const base_url = process.env.NEXT_PUBLIC_BASE_URL || "https://ovoship.com/server";
    if (!base_url) {
      setError("Base URL is not defined in environment variables.");
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(
        `${base_url}/api/v1/saas/login?api=true`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        // save token
        Cookies.set("saasAuthToken", data.access, { expires: 1 }); // 1 day expiry
        Cookies.set("saasRefreshToken", data.refresh, { expires: 7 });
        Cookies.set("saasDynamicBaseUrl", base_url, { expires: 7 });
  

        localStorage.setItem("saasAuthToken", data.access);
        localStorage.setItem("saasRefreshToken", data.refresh);
        localStorage.setItem("saasDynamicBaseUrl", base_url);
        

        console.log("saasAuthToken:", data.access);
        console.log("saasRefreshToken:", data.refresh);
        console.log("saasDynamicBaseUrl:", base_url);

        router.push("/saas/dashboard");
      } else {
        setError(data.detail || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl dark:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-center" variants={itemVariants}>
          <Image src="/full-logo-white.png" alt="OvoShip Logo" width={150} height={50} />
        </motion.div>
        
        <motion.h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white" variants={itemVariants}>
          Welcome Back
        </motion.h2>
        
        <motion.p className="text-center text-gray-500 dark:text-gray-400" variants={itemVariants}>
          Sign in to continue to your dashboard
        </motion.p>

        {error && (
          <motion.p
            className="text-center text-red-500"
            variants={itemVariants}
          >
            {error}
          </motion.p>
        )}

        <motion.form className="mt-8 space-y-6" variants={itemVariants} onSubmit={handleSubmit}>
          <div className="relative">
            <motion.input
              id="email"
              name="email"
              type="email"
              required
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-600 dark:text-white dark:border-gray-600 dark:focus:border-orange-500 bg-transparent"
              placeholder="john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-gray-400 dark:peer-focus:text-orange-500"
            >
              Email address
            </motion.label>
          </div>

          <div className="relative">
            <motion.input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-600 dark:text-white dark:border-gray-600 dark:focus:border-orange-500 bg-transparent"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-gray-400 dark:peer-focus:text-orange-500"
            >
              Password
            </motion.label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-10 font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </motion.form>
        
        <motion.div className="text-sm text-center" variants={itemVariants}>
            <p className="text-gray-500 dark:text-gray-400">
                <Link href="/saas/auth/forgot-password" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
                    Forgot your password?
                </Link>
            </p>
            {/* <p className="text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/saas/auth/register" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
                    Sign up
                </Link>
            </p> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
