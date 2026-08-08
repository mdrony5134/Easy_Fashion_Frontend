"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const { data: myProfileData, isLoading } = useGetMyProfileQuery({});
  const userInfo = myProfileData?.data;

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updateData = {
        fullName: formData.fullName,
        phone: formData.phone,
      };

      await updateProfile(updateData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64 bg-white rounded-2xl shadow-sm p-6 border border-[#ADADAD40]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#ADADAD40]">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-semibold text-primary">
            Personal Information
          </h1>
          <span className="text-primary">|</span>
          <span className="text-primary">Edit</span>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Full Name"
                className="w-full py-6 rounded-xl"
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Phone Number"
                className="w-full py-6 rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 py-6 bg-transparent rounded-[40px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-6 py-6 bg-primary text-white rounded-[40px] flex items-center justify-center gap-2"
            >
              {isUpdating && <Loader2 className="animate-spin size-4" />}
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6 bg-white border border-[#ADADAD40] shadow-sm rounded-[16px] p-8">
        <h1 className="text-2xl font-semibold text-primary">
          Personal Information
        </h1>
        <Button
          onClick={() => {
            setFormData({
              fullName: userInfo?.fullName || "",
              phone: userInfo?.phone || "",
            });
            setIsEditing(true);
          }}
          variant="outline"
          className="text-primary border-primary hover:bg-primary/10"
        >
          Edit
        </Button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#ADADAD40]">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-500">
              Full Name
            </Label>
            <p className="text-gray-900 mt-1">{userInfo?.fullName || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">
              Email Address
            </Label>
            <p className="text-gray-900 mt-1">{userInfo?.email || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">
              Phone Number
            </Label>
            <p className="text-gray-900 mt-1">{userInfo?.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
