import { Button } from '../../components/ui/button';
import React, { useEffect, useState } from 'react';
import { Bell, Mail, Smartphone, Info } from 'lucide-react';
import { Switch } from '../../components/ui/switch';

function NotificationsContainer() {
  const [appNotificaiton, setAppNotification] = useState(false);
  const [emailNotificaiton, setEmailNotification] = useState(false);
  const [pushNotificaiton, setPushNotification] = useState(false);
  
  const SavePreferenceHandler = async()=> {
    const userPreference = {
      appNotificaiton,
      emailNotificaiton,
      pushNotificaiton
    }
    await localStorage.setItem('userPreferences', JSON.stringify(userPreference))
    alert('successfully!')
  }

  useEffect(()=>{
    const userPreference = JSON.parse(localStorage.getItem('userPreferences'));
    if (userPreference) {
     setAppNotification(userPreference.appNotificaiton)
     setEmailNotification(userPreference.emailNotificaiton)
     setPushNotification(userPreference.pushNotificaiton) 
    }
  }, [])
  
  return (
    <>
      <div className="">
        <div className="grid w-full grid-cols-1 gap-6 p-6 bg-white border min-h-60 border-tertiary/15 rounded-b-xl rounded-tr-xl">
          {/* Top Section */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left */}
            <div>
              <h2 className="text-[18px] font-semibold text-secondary flex items-center gap-2">
                Notification Preferences
              </h2>
              <p className="mt-1 text-sm font-normal text-tertiary">Your current subscription</p>
            </div>
          </div>

          <div className="w-full p-5 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-6">
            <div className="grid gap-4">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-[2px]">
                <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-[9px] text-primary flex-shrink-0">
                  <Bell size={25} />
                </div>
                <div className="flex flex-col flex-1 mt-2 sm:mt-0 sm:ml-4">
                  <p className="font-medium text-[18px]">In-App Notifications</p>
                  <p className="text-[14px] font-normal text-tertiary">
                    Receive notifications within the CrediSync portal
                  </p>
                </div>
                <div>
                  <Switch className="data-[state=checked]:bg-primary bg-tertiary mt-3 sm:mt-0" checked={appNotificaiton} onCheckedChange={setAppNotification} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-[2px]">
                <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-[9px] text-primary flex-shrink-0">
                  <Mail size={25} />
                </div>
                <div className="flex flex-col flex-1 mt-2 sm:mt-0 sm:ml-4">
                  <p className="font-medium text-[18px]">Email Notifications</p>
                  <p className="text-[14px] font-normal text-tertiary">
                    Receive credential updates and reminders via email
                  </p>
                </div>
                <div>
                  <Switch className="data-[state=checked]:bg-primary  bg-tertiary  mt-3 sm:mt-0" checked={emailNotificaiton} onCheckedChange={setEmailNotification} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-[2px]">
                <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-[9px] text-primary flex-shrink-0">
                  <Smartphone size={25} />
                </div>
                <div className="flex flex-col flex-1 mt-2 sm:mt-0 sm:ml-4">
                  <p className="font-medium text-[18px]">Push Notifications</p>
                  <p className="text-[14px] font-normal text-tertiary">
                    Receive mobile push notifications for urgent updates  Email
                  </p>
                </div>
                <div>
                  <Switch checked={pushNotificaiton} onCheckedChange={setPushNotification} className="data-[state=checked]:bg-primary bg-tertiary mt-3 sm:mt-0" />
                </div>
              </div>

              <div className="flex items-center w-full gap-2 p-3 mt-2 border rounded-lg bg-primary/10 border-primary/30 text-primary">
                <div className="w-5 h-full mt-2">
                  <Info className="flex-shrink-0 w-5 h-5" />
                </div>
                <div className="w-full text-sm font-normal text-primary">
                  <span className="leading-snug text-[18px] font-medium">Compliance Alerts</span>
                  <p className='text-sm font-normal'>
                    Critical notifications (like verification failures or expiry warnings) will still be sent even if
                    you disable other notifications to ensure compliance.
                  </p>
                </div>
              </div>
              <Button className='sm:w-48 text-[16px] font-semibold rounded-md' onClick={SavePreferenceHandler}>Save Preferences</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationsContainer;
