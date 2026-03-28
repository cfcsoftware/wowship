"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

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
          <Image src="/full-logo-dark.png" alt="OvoShip Logo" width={150} height={50} />
        </motion.div>
        
        <motion.h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white" variants={itemVariants}>
          Forgot Your Password?
        </motion.h2>
        
        <motion.p className="text-center text-gray-500 dark:text-gray-400" variants={itemVariants}>
          Enter your email and we will send you a reset link.
        </motion.p>

        <motion.form className="mt-8 space-y-6" variants={itemVariants}>
          <div className="relative">
            <motion.input
              id="email"
              name="email"
              type="email"
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

          <motion.button
            type="submit"
            className="w-full py-3 mt-10 font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Reset Link
          </motion.button>
        </motion.form>
        <motion.div className="text-sm text-center" variants={itemVariants}>
            <Link href="/saas/auth/login" className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
                Back to login
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
