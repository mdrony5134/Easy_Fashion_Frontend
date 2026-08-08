"use client";

import facebookImage from "@/assets/facebook.png";
import googleImage from "@/assets/google.png";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserLoginMutation } from "@/redux/api/registerApi";
import Cookies from "js-cookie";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [userLoginFn] = useUserLoginMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
        general: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: "", password: "", general: "" });

    if (!formData.email || !formData.password) {
      setErrors({
        ...errors,
        general: "Please fill in all fields",
      });
      setIsLoading(false);
      return;
    }

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      console.log("Login data:", loginData);

      const response = await userLoginFn(loginData).unwrap();

      if (response) {
        // console.log("Login successful:", response);
        toast.success("Login successful!");
        if (response?.data?.accessToken) {
          // console.log("accessToken", response?.data?.accessToken);
          Cookies.set("accessToken", response?.data?.accessToken);
          router.push("/");
        }
      } else {
        setErrors({
          ...errors,
          general: response.message || "Login failed. Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.data?.message) {
        setErrors({
          ...errors,
          general: error.data.message,
        });
      } else if (error.status === 401) {
        setErrors({
          ...errors,
          general: "Invalid email or password. Please try again.",
        });
      } else if (error.status === 404) {
        setErrors({
          ...errors,
          general: "User not found. Please check your email or sign up.",
        });
      } else {
        setErrors({
          ...errors,
          general: "An error occurred during login. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    localStorage.setItem("googleSignIn", "true");

    signIn("google").catch((err) => {
      console.error("Google login error:", err);
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    });
  };
  const handleFacebookLogin = () => {
    setFacebookLoading(true);
    localStorage.setItem("facebookSignIn", "true");

    signIn("facebook").catch((err) => {
      console.error("Facebook login error:", err);
      toast.error("Facebook login failed. Please try again.");
      setFacebookLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 border border-[#ADADAD40] rounded-2xl p-8 shadow-sm">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-[180px] h-20">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-500 text-sm">
            Please enter your credentials to log in to your account.
          </p>
        </div>
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-4 py-6 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-4 py-6 pr-12 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* <div className="text-right mt-2">
              <Link
                href="/forgot-password"
                className="text-primary hover:text-primary text-sm disabled:opacity-50"
              >
                Forgot password?
              </Link>
            </div> */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-medium py-6 px-4 rounded-[40px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or login with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              variant="outline"
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-6 px-4 rounded-[40px] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Image
                src={googleImage}
                alt="google"
                width={20}
                height={20}
                className="object-contain"
                priority
              />
              <span className="flex items-center gap-2">
                {googleLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Redirecting...
                  </>
                ) : (
                  "Continue with Google"
                )}
              </span>
            </Button>
            {/* <Button
              type="button"
              onClick={handleFacebookLogin}
              disabled={facebookLoading}
              variant="outline"
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-6 px-4 rounded-[40px] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Image
                src={facebookImage}
                alt="facebook"
                width={20}
                height={20}
                className="object-contain"
                priority
              />
              <span className="flex items-center gap-2">
                {facebookLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Redirecting...
                  </>
                ) : (
                  "Continue with facebook"
                )}
              </span>
            </Button> */}
          </div>

          <div className="text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="text-primary hover:text-primary font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
