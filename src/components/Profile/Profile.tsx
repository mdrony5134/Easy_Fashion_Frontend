"use client";

import { MyOrdersSection } from "@/components/Profile/MyOrders";
import { MyProfile } from "@/components/Profile/MyProfile";
import { OrderTracking } from "@/components/Profile/OrderTracking";
import { ProfileSidebar } from "@/components/Profile/ProfileSidebar";
import { useState } from "react";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("my-profile");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "my-profile":
        return <MyProfile />;
      case "order-tracking":
        return <OrderTracking />;
      case "my-orders":
        return <MyOrdersSection />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="pt-16 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile</h1>
          <p className="text-gray-500 mt-2">Manage your account settings and preferences</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <ProfileSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
          <div className="flex-1">{renderActiveSection()}</div>
        </div>
      </div>
    </div>
  );
}
