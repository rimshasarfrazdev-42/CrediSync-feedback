import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function choosePlanContainer({ setStep, step }) {
  const navigate = useNavigate();
  const PLANS = {
    monthly: {
      id: 'pro-month',
      name: 'Professional Plan',
      price: 29,
      billingCycle: 'Monthly',
      durationMonths: 1,
      features: [
        'Automated verification',
        'Full readiness score',
        'Smart alerts',
        'Secure sharing',
        'Unlimited documents',
        'Priority support',
        'Advanced analytics',
      ],
    },

    annual: {
      id: 'pro-year',
      name: 'Professional Plan',
      price: 259,
      billingCycle: 'Annual',
      durationMonths: 12,
      features: [
        'Automated verification',
        'Full readiness score',
        'Smart alerts',
        'Secure sharing',
        'Unlimited documents',
        'Priority support',
        'Advanced analytics',
      ],
    },
  };
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5">
        <div className="p-5 h-[120px] bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC] rounded-[12px] shadow-md">
          <h1 className="text-[25px] text-secondary font-bold mb-1">Choose Your Plan</h1>
          <p className="text-rare text-[16px] font-normal mb-8">
            Select the perfect plan for your needs. Always flexible to scale.
          </p>
        </div>

        <div className="min-h-[490px] bg-transparent w-full">
        <Tabs defaultValue="Monthly Plan" className="w-full">
  {/* OUTER WRAPPER CARD (like screenshot) */}
  <div className="">
    {/* Tabs header aligned to top-left */}
    <TabsList
      className="inline-grid grid-cols-2 p-1 border rounded-b-none h-11 rounded-xl bg-tertiary/10 border-tertiary/15"
    >
      <TabsTrigger
        value="Monthly Plan"
        className="
          h-9 px-4 rounded-t-lg text-[13px] font-semibold text-secondary
          data-[state=active]:bg-white data-[state=active]:shadow-sm
          data-[state=active]:text-secondary
        "
      >
        Monthly Plan
      </TabsTrigger>

      <TabsTrigger
        value="Annual Plan"
        className="
          h-9 px-4 rounded-t-lg text-[13px] font-semibold text-secondary
          data-[state=active]:bg-white data-[state=active]:shadow-sm
          data-[state=active]:text-secondary
        "
      >
        Annual Plan
      </TabsTrigger>
    </TabsList>

    {/* CONTENT AREA (same card, like screenshot) */}
    <div className="p-4 bg-white border rounded-r-2xl rounded-b-2xl border-tertiary/10 sm:p-5">
      {/* MONTHLY */}
      <TabsContent value="Monthly Plan" className="m-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* FREE */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-tertiary/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-bold text-secondary">Free</h3>
                <p className="mt-1 text-[13px] text-tertiary">Perfect for getting started</p>
              </div>

              {/* Current Plan badge */}
              <span className="rounded-full bg-tertiary/15 px-3 py-1 text-[12px] font-medium text-rare">
                Current Plan
              </span>
            </div>

            <div className="mt-6 text-[34px] font-bold text-secondary">$0</div>

            <Button
              disabled
              className="mt-5 w-full rounded-lg bg-tertiary/20 py-6 text-[14px] font-semibold text-tertiary hover:bg-tertiary/20"
            >
              Current Plan
            </Button>

            <h4 className="mt-6 text-[15px] font-semibold text-secondary">What&apos;s Included</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-rare">
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Basic credential tracking
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Up to 5 documents
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Standard support
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Email notifications
              </li>
            </ul>
          </div>

          {/* PROFESSIONAL (HIGHLIGHT like screenshot) */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-primary/60">
            <h3 className="text-[18px] font-bold text-secondary">{PLANS.monthly.name}</h3>
            <p className="mt-1 text-[13px] text-tertiary">For individual practitioners</p>

            <div className="flex items-end gap-1 mt-6">
              <div className="text-[34px] font-bold text-secondary">${PLANS.monthly.price}</div>
              <div className="pb-1 text-[13px] text-tertiary">/{PLANS.monthly.billingCycle}</div>
            </div>

            <Button
              className="mt-5 w-full rounded-lg bg-primary py-6 text-[14px] font-semibold text-white hover:bg-[#123057]"
              onClick={() => {
                localStorage.setItem("selectedPlan", JSON.stringify(PLANS.monthly));
                navigate("/checkout");
              }}
            >
              Subscribe
            </Button>

            <h4 className="mt-6 text-[15px] font-semibold text-secondary">What&apos;s Included</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-rare">
              {PLANS.monthly.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CircleCheck size={14} className="text-primary" /> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* ENTERPRISE */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-tertiary/10">
            <h3 className="text-[18px] font-bold text-secondary">Enterprise Plan</h3>
            <p className="mt-1 text-[13px] text-tertiary">For institutions and organizations</p>

            <div className="mt-6 text-[30px] font-bold text-secondary">Custom pricing</div>

            <Button className="mt-5 w-full rounded-lg border border-tertiary/30 bg-white py-6 text-[14px] font-semibold text-tertiary hover:bg-tertiary/5">
              Contact Sales
            </Button>

            <h4 className="mt-6 text-[15px] font-semibold text-secondary">What&apos;s Included</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-rare">
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Everything in Professional
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Multi-user accounts
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Custom integrations
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Dedicated support
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> SLA guarantee
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Advanced security
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Team management
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom helper text */}
        <div className="mt-6 text-center">
          <p className="text-[13px] text-tertiary">Need help choosing the right plan?</p>
          <button className="text-[13px] font-semibold text-primary hover:underline">
            Contact our sales team
          </button>
        </div>
      </TabsContent>

      {/* ANNUAL */}
      <TabsContent value="Annual Plan" className="m-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* FREE */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-tertiary/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-bold text-secondary">Free</h3>
                <p className="mt-1 text-[13px] text-tertiary">Perfect for getting started</p>
              </div>

              <span className="rounded-full bg-tertiary/15 px-3 py-1 text-[12px] font-medium text-rare">
                Current Plan
              </span>
            </div>

            <div className="mt-6 text-[34px] font-bold text-secondary">$0</div>

            <Button
              disabled
              className="mt-5 w-full rounded-lg bg-tertiary/20 py-6 text-[14px] font-semibold text-tertiary hover:bg-tertiary/20"
            >
              Current Plan
            </Button>

            <h4 className="mt-6 text-[15px] font-semibold text-secondary">What&apos;s Included</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-rare">
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Basic credential tracking
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Up to 5 documents
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Standard support
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Email notifications
              </li>
            </ul>
          </div>

          {/* PROFESSIONAL (HIGHLIGHT like screenshot) */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-primary/60">
            <h3 className="text-[18px] font-bold text-secondary">{PLANS.annual.name}</h3>
            <p className="mt-1 text-[13px] text-tertiary">For individual practitioners</p>

            <div className="flex items-end gap-1 mt-6">
              <div className="text-[34px] font-bold text-secondary">${PLANS.annual.price}</div>
              <div className="pb-1 text-[13px] text-tertiary">/{PLANS.annual.billingCycle}</div>
            </div>

            <Button
              className="mt-5 w-full rounded-lg bg-primary py-6 text-[14px] font-semibold text-white hover:bg-[#123057]"
              onClick={() => {
                localStorage.setItem("selectedPlan", JSON.stringify(PLANS.annual));
                navigate("/checkout");
              }}
            >
              Subscribe
            </Button>

            <h4 className="mt-6 text-[15px] font-semibold text-secondary">What&apos;s Included</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-rare">
              {PLANS.annual.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CircleCheck size={14} className="text-primary" /> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* ENTERPRISE */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-tertiary/10">
            <h3 className="text-[18px] font-bold text-secondary">Enterprise Plan</h3>
            <p className="mt-1 text-[13px] text-tertiary">For institutions and organizations</p>

            <div className="mt-6 text-[30px] font-bold text-secondary">Custom pricing</div>

            <Button className="mt-5 w-full rounded-lg border border-tertiary/30 bg-white py-6 text-[14px] font-semibold text-tertiary hover:bg-tertiary/5">
              Contact Sales
            </Button>

            <h4 className="mt-6 text-[15px] font-semibold text-secondary">What&apos;s Included</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-rare">
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Everything in Professional
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Multi-user accounts
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Custom integrations
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Dedicated support
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> SLA guarantee
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Advanced security
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck size={14} className="text-primary" /> Team management
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[13px] text-tertiary">Need help choosing the right plan?</p>
          <button className="text-[13px] font-semibold text-primary hover:underline">
            Contact our sales team
          </button>
        </div>
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
