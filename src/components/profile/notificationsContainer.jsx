import { Button } from "../../components/ui/button";
import React, { useEffect, useState } from "react";
import { Bell, Mail, Smartphone, Info } from "lucide-react";
import { Switch } from "../../components/ui/switch";

function NotificationsContainer() {
  const [appNotificaiton, setAppNotification] = useState(false);
  const [emailNotificaiton, setEmailNotification] = useState(false);
  const [pushNotificaiton, setPushNotification] = useState(false);

  const SavePreferenceHandler = async () => {
    const userPreference = {
      appNotificaiton,
      emailNotificaiton,
      pushNotificaiton,
    };
    localStorage.setItem("userPreferences", JSON.stringify(userPreference));
    alert("successfully!");
  };

  useEffect(() => {
    const userPreference = JSON.parse(localStorage.getItem("userPreferences") || "null");
    if (userPreference) {
      setAppNotification(!!userPreference.appNotificaiton);
      setEmailNotification(!!userPreference.emailNotificaiton);
      setPushNotification(!!userPreference.pushNotificaiton);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-6 p-6 bg-white border min-h-60 border-tertiary/15 rounded-b-xl lg:rounded-r-xl">
        {/* Top Section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[18px] font-semibold text-secondary flex items-center gap-2">
            Notification Preferences
          </h2>
          <p className="text-sm font-normal text-tertiary">Choose how you receive alerts and reminders.</p>
        </div>

        {/* Card wrapper like screenshot */}
        <div className="w-full p-4 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-6">
          <div className="grid gap-4">
            {/* In-App */}
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 flex items-center justify-center bg-primary/10 rounded-[9px] text-primary flex-shrink-0">
                  <Bell size={18} />
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-[14px] text-secondary">In-App Notifications</p>
                  <p className="text-[12px] font-normal text-tertiary">
                    Receive notifications within the CrediSync portal
                  </p>
                </div>
              </div>

              <Switch
                className="data-[state=checked]:bg-primary bg-tertiary flex-shrink-0"
                checked={appNotificaiton}
                onCheckedChange={setAppNotification}
              />
            </div>

            {/* Email */}
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 flex items-center justify-center bg-primary/10 rounded-[9px] text-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-[14px] text-secondary">Email Notifications</p>
                  <p className="text-[12px] font-normal text-tertiary">
                    Receive credential updates and reminders via email
                  </p>
                </div>
              </div>

              <Switch
                className="data-[state=checked]:bg-primary bg-tertiary flex-shrink-0"
                checked={emailNotificaiton}
                onCheckedChange={setEmailNotification}
              />
            </div>

            {/* Push */}
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 flex items-center justify-center bg-primary/10 rounded-[9px] text-primary flex-shrink-0">
                  <Smartphone size={18} />
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-[14px] text-secondary">Push Notifications</p>
                  <p className="text-[12px] font-normal text-tertiary">
                    Receive mobile push notifications for urgent updates
                  </p>
                </div>
              </div>

              <Switch
                className="data-[state=checked]:bg-primary bg-tertiary flex-shrink-0"
                checked={pushNotificaiton}
                onCheckedChange={setPushNotification}
              />
            </div>

            {/* Compliance Alerts (same like screenshot) */}
            <div className="flex items-start gap-2 p-3 border rounded-md border-secondary/30 bg-secondary/10">
              <Info className="w-[18px] h-[18px] mt-0.5 text-primary flex-shrink-0" />
              <div className="leading-snug">
                <p className="text-[18px] font-semibold text-primary">Compliance Alerts</p>
                <p className="text-[14px] font-normal text-tertiary">
                  Critical notifications (like verification failures or expiry warnings) will still be sent even if you
                  disable other notifications to ensure compliance.
                </p>
              </div>
            </div>

            {/* Button */}
            <Button
              className="w-fit px-4 !bg-primary !text-white text-[12px] font-semibold rounded-md"
              onClick={SavePreferenceHandler}
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsContainer;
