import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { checkOutSchema } from '../../../validator/checkOutSchema';
import WelcomeBanner from '../../DashBoard/WelcomeBanner';
import TermsConditionsModal from '../../../pages/legal/TermConditionModal';

function CheckoutContainer() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    cvc: '',
    billingAddress: '',
    city: '',
    state: '',
    zip: '',
  });
  const [expiryDate, setExpiryDate] = useState('');
  const [renewDate, setRenewDate] = useState('');
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Load selected plan & calculate expiry
  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('selectedPlan'));
    if (selected) {
      setPlan(selected);
      const now = new Date();
      now.setMonth(now.getMonth() + selected.durationMonths);
      setExpiryDate(now.toISOString().slice(0, 10));
      setRenewDate(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, []);

  const subscribeHandler = async () => {
    // ✅ Terms validation (SAFE here)
    if (!termsAccepted) {
      setErrors((prev) => ({
        ...prev,
        terms: 'You must agree to the Terms & Conditions',
      }));
      return;
    }

    try {
      setErrors({});
      await checkOutSchema.validate(form, { abortEarly: false });

      const paymentInfo = { ...form, expiryDate, renewDate, plan };
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

      setExpiryDate('');
      navigate('/subscription-active');
    } catch (err) {
      const formattedErrors = {};
      err.inner.forEach((e) => {
        formattedErrors[e.path] = e.message;
      });
      setErrors(formattedErrors);
    }
  };

  const [openTerms, setOpenTerms] = useState(false);
  return (
    <div className="grid w-full grid-cols-1 gap-5 ">
      {/* <div className="p-5 h-[120px] bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC] rounded-[12px] shadow-md">
        <h1 className="text-[25px] text-secondary font-bold mb-1">Complete Your Purchase</h1>
        <p className="text-rare text-[16px] font-normal mb-8">
          Enter your payment information to activate your subscription
        </p>
      </div> */}
      <WelcomeBanner
        heading="Complete Your Purchase"
        subHeading=" Enter your payment information to activate your subscription"
      />

      <div className="w-full bg-transparent">
        <div className="grid w-full grid-cols-1 gap-8 p-6 bg-white border border-tertiary border-opacity-15 rounded-3xl lg:grid-cols-12">
          {/* LEFT: PAYMENT INFORMATION */}
          <div className="w-full space-y-5 lg:col-span-8 border rounded-xl p-[24px]">
            <h2 className="text-[25px] text-secondary font-bold">Payment Information</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">First Name</p>
                <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">Last Name</p>
                <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">Email</p>
                <Input name="email" placeholder="you@hospital.org" value={form.email} onChange={handleChange} />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">Card Number</p>
                <Input
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">Expiration Date</p>
                <Input placeholder="MM/DD/YYYY" value={expiryDate} readOnly />
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">CVC</p>
                <Input name="cvc" placeholder="123" value={form.cvc} onChange={handleChange} />
                {errors.cvc && <p className="text-sm text-red-500">{errors.cvc}</p>}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[18px] font-medium mb-2 text-secondary">Billing Address</p>
              <Input
                name="billingAddress"
                placeholder="Enter your Billing Address"
                value={form.billingAddress}
                onChange={handleChange}
              />
              {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">City</p>
                <Input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">State</p>
                <Input name="state" placeholder="State" value={form.state} onChange={handleChange} />
                {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] font-medium mb-2 text-secondary">Zip Code</p>
                <Input name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} />
                {errors.zip && <p className="text-sm text-red-500">{errors.zip}</p>}
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="w-full space-y-5 lg:col-span-4 border rounded-xl p-[24px]">
            <h2 className="text-[25px] font-bold">Order Summary</h2>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[16px] font-normal text-tertiary">{plan?.name}</span>
                <span className="text-[18px] font-medium text-secondary">
                  ${plan?.price}/{plan?.billingCycle?.slice(0, 3).toLowerCase()}
                </span>
              </div>
            </div>

            <ul className="ml-5 space-y-1 text-sm font-normal list-disc text-rare">
              {plan?.features?.slice(0, 4)?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <hr />

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[16px] font-normal text-tertiary">Subtotal</span>
                <span className="text-[16px] font-normal text-secondary">
                  ${plan?.price}/{plan?.billingCycle?.slice(0, 3).toLowerCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[16px] font-normal text-tertiary">Tax</span>
                <span className="text-[16px] font-normal text-secondary">$2.32</span>
              </div>
            </div>

            <hr />
            <div className="flex justify-between ">
              <span className="text-[20px] font-bold text-secondary">Total Due Today</span>
              <span className="text-[20px] font-bold text-primary">${plan?.price + 2.32}</span>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (e.target.checked) {
                    setErrors((prev) => ({ ...prev, terms: undefined }));
                  }
                }}
                className="mt-1 text-primary"
              />

              <label htmlFor="terms" className="text-sm font-normal text-secondary">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTerms(true);
                  }}
                  className="underline text-primary hover:text-primary/80"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>

            {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}

            <TermsConditionsModal
              open={openTerms}
              onClose={() => setOpenTerms(false)}
              onAccept={() => {
                setTermsAccepted(true);
                setErrors((prev) => ({ ...prev, terms: undefined }));
                setOpenTerms(false);
              }}
            />

            <p className="text-sm text-tertiary">Renews automatically on {renewDate}. Cancel anytime.</p>

            <Button
              className="w-full !bg-primary !text-white py-3 rounded-md text-[16px] font-semibold"
              onClick={subscribeHandler}
            >
              Subscribe & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutContainer;
