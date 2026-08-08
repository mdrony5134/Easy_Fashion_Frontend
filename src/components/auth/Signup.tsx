"use client";

import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserRegistrationMutation } from "@/redux/api/registerApi";
import { signUpSchema } from "@/schema/SignUpSchema";
import { Eye, EyeOff, Lock, Mail, Phone, User, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const [userRegistrationFn] = useUserRegistrationMutation();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof SignUpFormData]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validationResult = signUpSchema.safeParse(formData);

    if (!validationResult.success) {
      const newErrors: Partial<Record<keyof SignUpFormData, string>> = {};
      validationResult.error.errors.forEach((error) => {
        const fieldName = error.path[0] as keyof SignUpFormData;
        newErrors[fieldName] = error.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      const bodyData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      // console.log("Sign up data:", bodyData);

      const response = await userRegistrationFn(bodyData).unwrap();
      if (response) {
        // console.log("Registration successful:", response);
        toast.success("User created successfully! Please login to continue.");
        router.push("/login");
      } else {
        console.error("Registration failed:", response);
        setErrors({
          email: response.message || "Registration failed. Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.data?.message) {
        setErrors({
          email: error.data.message,
        });
      } else if (error.status === 409) {
        setErrors({
          email: "User with this email already exists.",
        });
      } else {
        setErrors({
          email: "An error occurred during registration. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-white">
      <div className="max-w-2xl w-full space-y-8 bg-white border border-[#ADADAD40] rounded-3xl p-8 shadow-sm">
        {/* Logo and Header */}
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
            Create an account
          </h1>
          <p className="text-gray-500 text-sm">
            Join us and start your journey today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <Label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-6 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={isLoading}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-6 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-6 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={isLoading}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-6 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-6 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-primary/20"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-5 w-5 animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span>Create Account</span>
              </div>
            )}
          </Button>

          {/* Sign In Link */}
          <div className="text-center pt-2">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-semibold hover:underline transition-all duration-200"
            >
              Sign in
            </Link>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-4">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
