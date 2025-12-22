import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { CircleCheck } from 'lucide-react';
import WelcomeBanner from '../../DashBoard/WelcomeBanner';

function SubscriptionActiveContainer() {
  const [data, setData] = useState(null);
  useEffect(()=>{
    const subscription = JSON.parse(localStorage.getItem('paymentInfo'));
    if(subscription){
      setData(subscription);
      console.log('data in subsc', subscription);
    }
  }, [])
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 ">
        <WelcomeBanner
        heading="Choose Your Plan"
        subHeading="Select the perfect plan for your needs. Always flexible to scale."
        />

        <div className="flex w-full bg-transparent ">
          <div
            className="w-full p-6 space-y-8 bg-white border border-tertiary border-opacity-15 rounded-3xl"
          >
            {/* TOP SUCCESS ICON + TEXT */}
            <div className="w-full space-y-3 text-center">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-32 h-32 p-5 rounded-full bg-activeLogo/10">
                 <img src="/check-circle.svg" alt="" />
                </div>
              </div>

              <h2 className="text-[39px] text-secondary font-semibold">Your Subscription is Active!</h2>
              <p className="text-rare text-[18px] font-medium">
                Thank you for upgrading to Professional Plan. You now have access to all premium features.
              </p>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* LEFT CARD */}
              <div className="p-5 space-y-4 border rounded-xl md:col-span-6">
                <h3 className="text-[25px] font-bold">Payment Information</h3>

                <div className="flex justify-between text-[16px]">
                  <div>
                    <p className="font-normal text-tertiary">Plan Name</p>
                    <p className="font-medium text-[18px] text-secondary">{data?.plan?.name}</p>
                  </div>
                  <div>
                    <p className="font-normal text-tertiary">Monthly Rate</p>
                    <p className="font-medium text-[18px] text-secondary">{data?.plan?.price}/{data?.plan?.billingCycle}</p>
                  </div>
                </div>

                <hr />

                <div>
                  <p className="text-tertiary text-[16px] font-normal">Next Billing Date</p>
                  <p className="font-medium text-[18px] text-secondary">{data?.renewDate}</p>
                  <p className="text-tertiary text-[14px] font-normal mt-1">Renews automatically. You can cancel anytime.</p>
                </div>
              </div>

              {/* RIGHT CARD */}
              <div className="p-5 space-y-4 border rounded-xl md:col-span-6">
                <h3 className="text-[25px] font-bold text-secondary">Unlocked Features</h3>

                <ul className="space-y-2 text-rare text-[16px] font-normal">
                  {data?.plan?.features.slice(0, 6).map((feature, index) => (
                  <li className="flex items-center gap-2" key={index}>
                    <CircleCheck size={13} className="text-primary" /> {feature}
                  </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              className="
        w-full 0 !text-white !bg-primary py-3 rounded-md  
        font-semibold text-[16px]
      "
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscriptionActiveContainer;
