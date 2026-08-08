"use client";

import {
  useUserFacebookLoginMutation,
  useUserGoogleLoginMutation,
} from "@/redux/api/registerApi";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthSync = () => {
  const { data: session, status } = useSession();
  const [storeUser] = useUserGoogleLoginMutation();
  const [storeFacebookUser] = useUserFacebookLoginMutation();
  const router = useRouter();

  const [isStoringUser, setIsStoringUser] = useState(false);

  useEffect(() => {
    const syncUserToken = async () => {
      const isGoogleSignIn = localStorage.getItem("googleSignIn");
      const isFacebookSignIn = localStorage.getItem("facebookSignIn");

      const name = session?.user?.name ?? "";

      if (status === "authenticated" && session?.user && isGoogleSignIn) {
        const existingToken = Cookies.get("accessToken");

        if (!existingToken) {
          setIsStoringUser(true);
          try {
            const response = await storeUser({
              provider: "GOOGLE",
              fullName: name,
              email: session.user.email,
            }).unwrap();

            if (response?.data?.accessToken) {
              Cookies.set("accessToken", response.data.accessToken);
              toast.success("Google login synced successfully!");
              router.push("/");
            }
          } catch (error: any) {
            // console.error("Failed to sync token:", error);
            toast.error(error.message || "Failed to sync Google account!");
          } finally {
            setIsStoringUser(false);
            localStorage.removeItem("googleSignIn");
          }
        }
      } else if (
        status === "authenticated" &&
        session?.user &&
        isFacebookSignIn
      ) {
        const existingToken = Cookies.get("accessToken");

        if (!existingToken) {
          setIsStoringUser(true);
          try {
            const response = await storeFacebookUser({
              provider: "FACEBOOK",
              fullName: name,
              email: session.user.email,
            }).unwrap();

            if (response?.data?.accessToken) {
              Cookies.set("accessToken", response.data.accessToken);
              toast.success("Facebook login synced successfully!");
              router.push("/");
            }
          } catch (error: any) {
            // console.error("Failed to sync token:", error);
            toast.error(error.message || "Failed to sync Facebook account!");
          } finally {
            setIsStoringUser(false);
            localStorage.removeItem("facebookSignIn");
          }
        }
      }
    };

    syncUserToken();
  }, [status, session, storeUser, storeFacebookUser, router]);

  return (
    <>
      {isStoringUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
            <p className="text-gray-800 text-lg font-medium animate-pulse">
              Syncing your account...
            </p>
            <p className="text-gray-500 text-sm">
              Please wait a moment while we get things ready
            </p>
          </div>
        </div>
      )}
    </>
  );
};
