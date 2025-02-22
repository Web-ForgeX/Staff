import { useEffect, useState } from "react";
import USER_SETTINGS_Account_Info from "./sections/account_info";
import USER_SETTINGS_Public_Profile from "./sections/public_profile";
import USER_SETTINGS_Session_Controls from "./sections/session_controls";
import USER_SETTINGS_Connections from "./sections/connections";
import { useAuth } from "@/hooks/user";
import SendRequest from "@/API/request";

interface AdditionalUserData {
  tebex_wallet: string;
  banner: string;
  bio: string;
}

export default function User_Settings() {
  const { user } = useAuth();
  const [additionalUserData, setAdditionalUserData] =
    useState<AdditionalUserData | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!user?.user_metadata.username) return;

      const response = await SendRequest({
        method: "GET",
        route: `/user/name/${user.user_metadata.username}`,
      });

      if (!response.data.error) {
        setAdditionalUserData(response.data);
        console.log(response.data);
      }
    }

    fetchUser();
  }, [user]);

  if (!user) return null;
  if (!additionalUserData) return null;

  return (
    <div className="max-w-4xl mx-auto mt-4 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Account Settings
      </h1>
      <USER_SETTINGS_Account_Info
        user={user}
        additionalData={additionalUserData}
      />
      <USER_SETTINGS_Public_Profile
        user={user}
        additionalData={additionalUserData}
      />
      <USER_SETTINGS_Session_Controls />
      <USER_SETTINGS_Connections user={user} />
    </div>
  );
}
