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
          <Tabs defaultValue="Monthly Plan" className="!bg-white w-full">
            {/* TAB BUTTONS */}
            <TabsList
              className="w-full max-w-[350px] grid grid-cols-2 h-16 
      bg-tertiary bg-opacity-10 border-tertiary border-[1px] border-opacity-15 rounded-t-xl rounded-b-none"
            >
              <TabsTrigger value="Monthly Plan" className="rounded-xl py-2.5 text-[14px] font-semibold text-secondary">
                Monthly Plan
              </TabsTrigger>
              <TabsTrigger value="Annual Plan" className="rounded-xl py-2.5 text-[14px] font-semibold text-secondary">
                Annual Plan
              </TabsTrigger>
            </TabsList>

            {/* MONTHLY PLAN CONTENT */}
            <TabsContent value="Monthly Plan" className="p-0 mt-0">
              <div className="flex justify-center w-full">
                {/* CONTENT CONTAINER */}
                <div
                  className="
          grid grid-cols-1 gap-10 w-full 
          bg-white p-5 border-tertiary border-[1px] border-opacity-15
          rounded-b-3xl rounded-tl-none rounded-tr-3xl
        "
                >
                  <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Free Plan */}
                    <div className="border-[1px] hover:border-primary rounded-xl p-6 shadow-lg hover:shadow-xl transition bg-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="mb-2 text-xl font-bold text-secondary">Free</h2>
                          <p className="mb-4 text-sm font-normal text-tertiary">Perfect for getting started</p>
                        </div>
                        <div className="rounded-full bg-tertiary/20">
                          <p className="text-[14px] px-3 text-rare text-center py-0.5">Current Plan</p>
                        </div>
                      </div>

                      <p className="text-[31px] text-secondary font-bold mb-4">$0</p>

                      <Button className="w-full bg-tertiary/30 text-tertiary text-[16px] font-semibold py-2.5 rounded-lg">
                        Current Plan
                      </Button>

                      <h3 className="font-medium text-secondary text-[18px] mt-6 mb-3">What's Included</h3>
                      <ul className="space-y-2 text-sm font-normal text-rare">
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Basic credential tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Up to 5 documents
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Standard support
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Email notifications
                        </li>
                      </ul>
                    </div>

                    {/* Professional Plan */}
                    <div className="border-[1px] hover:border-primary rounded-xl p-6 shadow-lg hover:shadow-xl transition bg-white">
                      <h2 className="mb-2 text-xl font-bold text-secondary">{PLANS.monthly.name}</h2>
                      <p className="mb-4 text-sm font-normal text-tertiary">For individual practitioners</p>
                      <p className="text-[31px] text-secondary font-bold mb-4">
                        ${PLANS.monthly.price}
                        <span className="text-[14px] text-tertiary font-normal">/{PLANS.monthly.billingCycle}</span>
                      </p>

                      <Button
                        className="w-full !text-white !bg-primary text-[16px] font-semibold py-2.5 rounded-lg transition"
                        onClick={() => {
                          localStorage.setItem('selectedPlan', JSON.stringify(PLANS.monthly));
                          navigate('/checkout');
                        }}
                      >
                        Subscribe
                      </Button>

                      <h3 className="font-medium text-secondary text-[18px] mt-6 mb-3">What's Included</h3>
                      <ul className="space-y-2 text-sm font-normal text-rare">
                        {PLANS.monthly.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CircleCheck size={13} className="text-primary" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enterprise Plan */}
                      <div className="border-[1px] hover:border-primary rounded-xl p-6 shadow-lg hover:shadow-md transition bg-white">
                      <h2 className="mb-2 text-xl font-bold text-secondary">Enterprise Plan</h2>
                      <p className="mb-4 text-sm font-normal text-tertiary">For institutions and organizations</p>
                      <p className="text-[31px] text-secondary font-bold mb-4">Custom pricing</p>

                      <Button className="w-full border-[1px] border-tertiary bg-white text-tertiary text-[16px] font-semibold py-2.5 rounded-lg">
                        Contact Sales
                      </Button>

                      <h3 className="font-medium text-secondary text-[18px] mt-6 mb-3">What's Included</h3>
                      <ul className="space-y-2 text-sm font-normal text-rare">
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Everything in Professional
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Multi-user accounts
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Custom integrations
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Dedicated support
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> SLA guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Advanced security
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Team management
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-tertiary font-normal text-[14px] text-center">
                      Need help choosing the right plan?
                    </p>
                    <p className="text-primary text-[14px] font-semibold text-center">Contact our sales team</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ANNUAL PLAN */}
            <TabsContent value="Annual Plan" className="p-0 mt-0">
              <div className="flex justify-center w-full">
                {/* CONTENT CONTAINER */}
                <div
                  className="
          grid grid-cols-1 gap-10 w-full 
          bg-white p-5 border-tertiary border-[1px] border-opacity-15
          rounded-b-3xl rounded-tl-none rounded-tr-3xl
        "
                >
                  <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Free Plan */}
                    <div className="border-[1px] hover:border-primary rounded-xl p-6 shadow-lg hover:shadow-xl transition bg-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="mb-2 text-xl font-bold text-secondary">Free</h2>
                          <p className="mb-4 text-sm font-normal text-tertiary">Perfect for getting started</p>
                        </div>
                        <div className="rounded-full bg-tertiary/20">
                          <p className="text-[14px] px-3 text-rare text-center py-0.5">Current Plan</p>
                        </div>
                      </div>

                      <p className="text-[31px] text-secondary font-bold mb-4">$0</p>

                      <Button className="w-full bg-tertiary/30 text-tertiary text-[16px] font-semibold py-2.5 rounded-md">
                        Current Plan
                      </Button>

                      <h3 className="font-medium text-secondary text-[18px] mt-6 mb-3">What's Included</h3>
                      <ul className="space-y-2 text-sm font-normal text-rare">
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Basic credential tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Up to 5 documents
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Standard support
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Email notifications
                        </li>
                      </ul>
                    </div>

                    {/* Professional Plan */}
                    <div className="border-[1px] hover:border-primary rounded-xl p-6 shadow-lg hover:shadow-xl transition bg-white">
                      <h2 className="mb-2 text-xl font-bold text-secondary">{PLANS.annual.name}</h2>
                      <p className="mb-4 text-sm font-normal text-tertiary">For individual practitioners</p>
                      <p className="text-[31px] text-secondary font-bold mb-4">
                        ${PLANS.annual.price}
                        <span className="text-[14px] text-tertiary font-normal">/{PLANS.annual.billingCycle}</span>
                      </p>

                      <Button
                        className="w-full text-white text-[16px] font-semibold py-2.5 rounded-lg transition"
                        onClick={() => {
                          localStorage.setItem('selectedPlan', JSON.stringify(PLANS.annual));
                          navigate('/checkout');
                        }}
                      >
                        Subscribe
                      </Button>

                      <h3 className="font-medium text-secondary text-[18px] mt-6 mb-3">What's Included</h3>
                      <ul className="space-y-2 text-sm font-normal text-rare">
                        {PLANS.annual.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CircleCheck size={13} className="text-primary" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="border-[1px] hover:border-primary rounded-xl p-6 shadow-lg hover:shadow-xl transition bg-white">
                      <h2 className="mb-2 text-xl font-bold text-secondary">Enterprise Plan</h2>
                      <p className="mb-4 text-sm font-normal text-tertiary">For institutions and organizations</p>
                      <p className="text-[31px] text-secondary font-bold mb-4">Custom pricing</p>

                      <Button className="w-full border-[1px] border-tertiary bg-white text-tertiary text-[16px] font-semibold py-2.5 rounded-md">
                        Contact Sales
                      </Button>

                      <h3 className="font-medium text-secondary text-[18px] mt-6 mb-3">What's Included</h3>
                      <ul className="space-y-2 text-sm font-normal text-rare">
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Everything in Professional
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Multi-user accounts
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Custom integrations
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Dedicated support
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> SLA guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Advanced security
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-primary" /> Team management
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-tertiary font-normal text-[14px] text-center">
                      Need help choosing the right plan?
                    </p>
                    <p className="text-primary text-[14px] font-semibold text-center">Contact our sales team</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default choosePlanContainer;
