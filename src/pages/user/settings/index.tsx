import USER_SETTINGS_Account_Info from "./sections/account_info";
import USER_SETTINGS_Public_Profile from "./sections/public_profile";
import USER_SETTINGS_Session_Controls from "./sections/session_controls";
import USER_SETTINGS_Connections from "./sections/connections";

import { useAuth } from "@/hooks/user";
export default function User_Settings() {
  const { user } = useAuth();
  if (!user) return;
  return (
    <div className="max-w-4xl mx-auto mt-4 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Account Settings
      </h1>
      <USER_SETTINGS_Account_Info user={user} />
      <USER_SETTINGS_Public_Profile user={user} />
      <USER_SETTINGS_Session_Controls />
      <USER_SETTINGS_Connections user={user} />
    </div>
  );
}
