import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "../../DashBoard/WelcomeBanner";

function choosePlanContainer({ setStep, step }) {
  const navigate = useNavigate();

  const PLANS = useMemo(
    () => ({
      monthly: {
        id: "pro-month",
        name: "Professional Plan",
        price: 29,
        billingCycle: "Monthly",
        durationMonths: 1,
        features: [
          "Automated verification",
          "Full readiness score",
          "Smart alerts",
          "Secure sharing",
          "Unlimited documents",
          "Priority support",
          "Advanced analytics",
        ],
      },
      annual: {
        id: "pro-year",
        name: "Professional Plan",
        price: 259,
        billingCycle: "Annual",
        durationMonths: 12,
        features: [
          "Automated verification",
          "Full readiness score",
          "Smart alerts",
          "Secure sharing",
          "Unlimited documents",
          "Priority support",
          "Advanced analytics",
        ],
      },
    }),
    []
  );

  const FREE_CARD = useMemo(
    () => ({
      key: "free",
      title: "Free",
      subtitle: "Perfect for getting started",
      priceLabel: "$0",
      badge: "Current Plan",
      button: { label: "Current Plan", disabled: true, variant: "free" },
      includedTitle: "What's Included",
      features: ["Basic credential tracking", "Up to 5 documents", "Standard support", "Email notifications"],
      highlight: false,
    }),
    []
  );

  const ENTERPRISE_CARD = useMemo(
    () => ({
      key: "enterprise",
      title: "Enterprise Plan",
      subtitle: "For institutions and organizations",
      priceLabel: "Custom pricing",
      badge: null,
      button: { label: "Contact Sales", disabled: false, variant: "outline" },
      includedTitle: "What's Included",
      features: [
        "Everything in Professional",
        "Multi-user accounts",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security",
        "Team management",
      ],
      highlight: false,
    }),
    []
  );

  const PRO_CARD = (plan) => ({
    key: "pro",
    title: plan.name,
    subtitle: "For individual practitioners",
    priceLabel: `$${plan.price}`,
    priceSuffix: `/${plan.billingCycle}`,
    badge: null,
    button: { label: "Subscribe", disabled: false, variant: "primary" },
    includedTitle: "What's Included",
    features: plan.features,
    highlight: true,
    planPayload: plan,
  });

  const renderCard = (card, opts = {}) => {
    const isPro = card.key === "pro";
    const isFree = card.key === "free";
    const isEnterprise = card.key === "enterprise";

    // Tablet layout: Enterprise full width below, others 2-up.
    // Mobile: same as before (1 col)
    // Desktop: same as before (3 col)
    const spanClasses = isEnterprise
      ? "md:col-span-2 lg:col-span-1"
      : "md:col-span-1";

    return (
      <div
        key={card.key}
        className={[
          "p-5 bg-white border shadow-sm rounded-2xl",
          card.highlight ? "border-primary/60" : "border-tertiary/10",
          spanClasses,
        ].join(" ")}
      >
        {/* Header row (Free only has badge in your UI) */}
        {isFree ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[18px] font-bold text-secondary">{card.title}</h3>
              <p className="mt-1 text-[13px] text-tertiary">{card.subtitle}</p>
            </div>
            <span className="rounded-full bg-tertiary/15 px-3 py-1 text-[12px] font-medium text-rare">
              {card.badge}
            </span>
          </div>
        ) : (
          <>
            <h3 className="text-[18px] font-bold text-secondary">{card.title}</h3>
            <p className="mt-1 text-[13px] text-tertiary">{card.subtitle}</p>
          </>
        )}

        {/* Price */}
        {isEnterprise ? (
          <div className="lg:mt-6 md:mt-5 mt-2 text-[30px] font-bold text-secondary">{card.priceLabel}</div>
        ) : isPro ? (
          <div className="flex items-end gap-1 mt-2 lg:mt-6 md:mt-5">
            <div className="text-[34px] font-bold text-secondary">{card.priceLabel}</div>
            <div className="pb-1 text-[13px] text-tertiary">{card.priceSuffix}</div>
          </div>
        ) : (
          <div className="lg:mt-6 md:mt-5 mt-2 text-[34px] font-bold text-secondary">{card.priceLabel}</div>
        )}

        {/* Button */}
        {isFree ? (
          <Button
            disabled
            className="lg:mt-5 md:mt-4 mt-2 w-full rounded-lg bg-tertiary/20 py-6 text-[14px] font-semibold text-tertiary hover:bg-tertiary/20"
          >
            {card.button.label}
          </Button>
        ) : isPro ? (
          <Button
            className="lg:mt-5 md:mt-4 mt-2 w-full rounded-lg bg-primary py-6 text-[14px] font-semibold text-white hover:bg-[#123057]"
            onClick={() => {
              localStorage.setItem("selectedPlan", JSON.stringify(card.planPayload));
              navigate("/checkout");
            }}
          >
            {card.button.label}
          </Button>
        ) : (
          <Button className="lg:mt-5 md:mt-4 mt-2 w-full rounded-lg border border-tertiary/30 bg-white py-6 text-[14px] font-semibold text-tertiary hover:bg-tertiary/5">
            {card.button.label}
          </Button>
        )}

        {/* Features */}
        <h4 className="mt-6 text-[15px] font-semibold text-secondary">{card.includedTitle}</h4>
        <ul className="mt-3 space-y-2 text-[13px] text-rare">
          {card.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CircleCheck size={14} className="text-primary" /> {feature}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderPlanGrid = (plan) => {
    const pro = PRO_CARD(plan);

    return (
      <>
        {/* IMPORTANT: only change tablet layout.
            - Mobile: 1 col
            - Tablet (md): 2 cols
            - Desktop (lg): 3 cols
        */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {renderCard(FREE_CARD)}
          {renderCard(pro)}
          {renderCard(ENTERPRISE_CARD)}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[13px] text-tertiary">Need help choosing the right plan?</p>
          <button className="text-[13px] font-semibold text-primary hover:underline">
            Contact our sales team
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5">
        <WelcomeBanner
          heading="Choose Your Plan"
          subHeading="Select the perfect plan for your needs. Always flexible to scale."
        />

        <div className="min-h-[490px] bg-transparent w-full">
          <Tabs defaultValue="Monthly Plan" className="w-full">
            <div>
              <TabsList className="inline-grid grid-cols-2 p-1 border h-11 rounded-t-xl bg-tertiary/10 border-tertiary/10">
                <TabsTrigger
                  value="Monthly Plan"
                  className="h-9 px-4 rounded-lg text-[13px] font-semibold text-secondary data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-secondary"
                >
                  Monthly Plan
                </TabsTrigger>

                <TabsTrigger
                  value="Annual Plan"
                  className="h-9 px-4 rounded-t-lg text-[13px] font-semibold text-secondary data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-secondary"
                >
                  Annual Plan
                </TabsTrigger>
              </TabsList>

              <div className="p-4 bg-white border rounded-r-2xl rounded-b-2xl border-tertiary/10 sm:p-5">
                <TabsContent value="Monthly Plan" className="m-0">
                  {renderPlanGrid(PLANS.monthly)}
                </TabsContent>

                <TabsContent value="Annual Plan" className="m-0">
                  {renderPlanGrid(PLANS.annual)}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default choosePlanContainer;
