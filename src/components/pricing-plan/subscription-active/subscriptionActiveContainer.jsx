import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import { CircleCheck } from "lucide-react";
import WelcomeBanner from "../../DashBoard/WelcomeBanner";
import { useNavigate } from "react-router-dom";

function SubscriptionActiveContainer() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
const handelSubmit=()=>{
  navigate("/dashboard");
}
  useEffect(() => {
    const subscription = JSON.parse(localStorage.getItem("paymentInfo"));
    if (subscription) {
      setData(subscription);
      console.log("data in subsc", subscription);
    }
  }, []);

  // consistent, responsive typography (mobile + tablet + desktop)
  const textSizes = useMemo(
    () => ({
      title: "text-[22px] sm:text-[26px] md:text-[30px] lg:text-[39px]",
      desc: "text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px]",
      cardTitle: "text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px]",
      label: "text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]",
      value: "text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]",
      helper: "text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]",
      feature: "text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]",
    }),
    []
  );

  // responsive icon sizing
  const checkIconSize = useMemo(() => {
    const featuresCount = data?.plan?.features?.length || 0;
    // just a safe memo to avoid re-renders; size is fixed by breakpoints via tailwind below
    return featuresCount ? 14 : 14;
  }, [data]);

  return (
    <div className="grid w-full grid-cols-1 gap-5">
      <WelcomeBanner
        heading="Choose Your Plan"
        subHeading="Select the perfect plan for your needs. Always flexible to scale."
      />

      <div className="flex w-full bg-transparent">
        <div className="w-full p-4 space-y-6 bg-white border border-tertiary border-opacity-15 rounded-3xl sm:p-5 md:p-6 md:space-y-8">
          {/* TOP SUCCESS ICON + TEXT */}
          <div className="w-full space-y-3 text-center">
            <div className="flex justify-center">
              <div className="flex items-center justify-center rounded-full">
                <img
                  src="/check-circle.svg"
                  alt="Subscription Active"
                  className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]"
                />
              </div>
            </div>

            <h2 className={`${textSizes.title} text-secondary font-semibold`}>
              Your Subscription is Active!
            </h2>

            <p className={`${textSizes.desc} text-rare font-medium max-w-[720px] mx-auto leading-relaxed`}>
              Thank you for upgrading to Professional Plan. You now have access to all premium features.
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-12">
            {/* LEFT CARD */}
            <div className="p-4 space-y-4 border rounded-xl sm:p-5 md:col-span-6">
              <h3 className={`${textSizes.cardTitle} font-bold text-secondary`}>
                Payment Information
              </h3>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <div className="min-w-0">
                  <p className={`${textSizes.label} font-normal text-tertiary`}>Plan Name</p>
                  <p className={`${textSizes.value} font-medium text-secondary break-words`}>
                    {data?.plan?.name || "-"}
                  </p>
                </div>

                <div className="min-w-0 sm:text-right">
                  <p className={`${textSizes.label} font-normal text-tertiary`}>Rate</p>
                  <p className={`${textSizes.value} font-medium text-secondary break-words`}>
                    {data?.plan?.price != null ? `$${data.plan.price}` : "-"}
                    {data?.plan?.billingCycle ? `/${data.plan.billingCycle}` : ""}
                  </p>
                </div>
              </div>

              <hr />

              <div>
                <p className={`${textSizes.label} text-tertiary font-normal`}>Next Billing Date</p>
                <p className={`${textSizes.value} font-medium text-secondary`}>{data?.renewDate || "-"}</p>
                <p className={`${textSizes.helper} text-tertiary font-normal mt-1`}>
                  Renews automatically. You can cancel anytime.
                </p>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="p-4 space-y-4 border rounded-xl sm:p-5 md:col-span-6">
              <h3 className={`${textSizes.cardTitle} font-bold text-secondary`}>Unlocked Features</h3>

              <ul className={`space-y-2 text-rare font-normal ${textSizes.feature}`}>
                {(data?.plan?.features || []).slice(0, 6).map((feature, index) => (
                  <li className="flex items-start gap-2" key={index}>
                    <CircleCheck
                      size={checkIconSize}
                      className="text-primary mt-[2px] shrink-0 w-4 h-4 sm:w-[15px] sm:h-[15px] md:w-4 md:h-4"
                    />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BUTTON */}
          <Button
          onClick={handelSubmit}
           className="w-full !text-white !bg-primary py-3 rounded-md font-semibold text-[14px] sm:text-[15px] md:text-[16px]">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionActiveContainer;
