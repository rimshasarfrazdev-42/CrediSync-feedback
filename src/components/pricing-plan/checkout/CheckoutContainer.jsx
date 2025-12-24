import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { checkOutSchema } from '../../../validator/checkOutSchema';
import WelcomeBanner from '../../DashBoard/WelcomeBanner';

import { CalendarDays } from 'lucide-react';
import TermsAndConditionsModal from '../../Modals/LegalAndConsentManagement/TermsAndConditionsModal';

function toMMDDYYYY(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function formatRenewDateFromISO(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const money = (n) => Number(n || 0).toFixed(2);

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

  // Store ISO internally
  const [expiryDate, setExpiryDate] = useState(''); // "YYYY-MM-DD"
  const [renewDate, setRenewDate] = useState('');

  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const expiryInputRef = useRef(null);

  const textSizes = useMemo(
    () => ({
      sectionTitle: 'text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px]',
      label: 'text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]',
      helper: 'text-[12px] sm:text-[13px] md:text-[14px] lg:text-[14px]',
    }),
    [],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //Load selected plan
  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('selectedPlan') || 'null');
    if (!selected) return;

    setPlan(selected);
  }, []);

  //  If user changes expiry, update renew date
  useEffect(() => {
    if (!expiryDate) {
      setRenewDate('');
      return;
    }
    setRenewDate(formatRenewDateFromISO(expiryDate));
  }, [expiryDate]);

  // ===== Order summary dynamic =====
  const billingLabel = useMemo(() => {
    const cycle = (plan?.billingCycle || '').toLowerCase();
    if (cycle.startsWith('month')) return 'mo';
    if (cycle.startsWith('annual') || cycle.startsWith('year')) return 'yr';
    return cycle ? cycle.slice(0, 2) : '';
  }, [plan]);

  const subtotal = useMemo(() => Number(plan?.price || 0), [plan]);

  // Keep your fixed tax value, but computed cleanly (change later if needed)
  const tax = useMemo(() => 2.32, []);

  const totalDueToday = useMemo(() => money(subtotal + tax), [subtotal, tax]);

  const summaryFeatures = useMemo(() => plan?.features?.slice(0, 4) || [], [plan]);

  const subscribeHandler = async () => {
    if (!termsAccepted) {
      setErrors((prev) => ({
        ...prev,
        terms: 'You must agree to the Terms & Conditions',
      }));
      return;
    }

    try {
      setErrors({});

      await checkOutSchema.validate(
        {
          ...form,
          expiryDate, 
        },
        { abortEarly: false },
      );

      const paymentInfo = { ...form, expiryDate, renewDate, plan };
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

      navigate('/subscription-active');
    } catch (err) {
      const formattedErrors = {};
      if (err?.inner?.length) {
        err.inner.forEach((e) => {
          formattedErrors[e.path] = e.message;
        });
      }
      setErrors(formattedErrors);
    }
  };

  const openDatePicker = () => {
    const el = expiryInputRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') el.showPicker();
    else el.click();
  };

  return (
    <div className="grid w-full grid-cols-1 gap-5">
      <WelcomeBanner
        heading="Complete Your Purchase"
        subHeading=" Enter your payment information to activate your subscription"
      />

      <div className="w-full bg-transparent">
        <div className="grid w-full grid-cols-1 gap-5 p-3 bg-white border sm:gap-6 md:gap-8 sm:p-4 md:p-6 border-tertiary border-opacity-15 rounded-3xl lg:grid-cols-12">
          {/* LEFT */}
          <div className="w-full p-4 space-y-4 border sm:space-y-5 lg:col-span-8 rounded-xl sm:p-5 md:p-6">
            <h2 className={`${textSizes.sectionTitle} text-secondary font-bold`}>Payment Information</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>First Name</p>
                <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                {errors.firstName && <p className={`${textSizes.helper} text-red-500`}>{errors.firstName}</p>}
              </div>

              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>Last Name</p>
                <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                {errors.lastName && <p className={`${textSizes.helper} text-red-500`}>{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>Email</p>
                <Input name="email" placeholder="you@hospital.org" value={form.email} onChange={handleChange} />
                {errors.email && <p className={`${textSizes.helper} text-red-500`}>{errors.email}</p>}
              </div>

              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>Card Number</p>
                <Input
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && <p className={`${textSizes.helper} text-red-500`}>{errors.cardNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Expiry */}
              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>Expiration Date</p>

                <div className="relative">
                  {/* Visible input */}
                  <Input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    value={toMMDDYYYY(expiryDate)}
                    readOnly
                    className="pr-10"
                    onClick={openDatePicker}
                  />

                  {/* Single custom icon */}
                  <button
                    type="button"
                    aria-label="Select expiration date"
                    onClick={openDatePicker}
                    className="absolute p-1 -translate-y-1/2 rounded-md right-2 top-1/2 hover:bg-tertiary/10"
                  >
                    <CalendarDays className="w-5 h-5 mb-5 text-tertiary" />
                  </button>
                  {errors.expiryDate && <p className={`${textSizes.helper} text-red-500`}>{errors.expiryDate}</p>}
                  {/* Hidden native date input */}
                  <input
                    ref={expiryInputRef}
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="absolute w-0 h-0 opacity-0 pointer-events-none"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* CVC */}
              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>CVC</p>
                <Input name="cvc" placeholder="123" value={form.cvc} onChange={handleChange} />
                {errors.cvc && <p className={`${textSizes.helper} text-red-500`}>{errors.cvc}</p>}
              </div>
            </div>

            <div className="flex flex-col">
              <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>Billing Address</p>
              <Input
                name="billingAddress"
                placeholder="Enter your Billing Address"
                value={form.billingAddress}
                onChange={handleChange}
              />
              {errors.billingAddress && <p className={`${textSizes.helper} text-red-500`}>{errors.billingAddress}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>City</p>
                <Input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                {errors.city && <p className={`${textSizes.helper} text-red-500`}>{errors.city}</p>}
              </div>

              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>State</p>
                <Input name="state" placeholder="State" value={form.state} onChange={handleChange} />
                {errors.state && <p className={`${textSizes.helper} text-red-500`}>{errors.state}</p>}
              </div>

              <div className="flex flex-col">
                <p className={`${textSizes.label} font-medium mb-2 text-secondary`}>Zip Code</p>
                <Input name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} />
                {errors.zip && <p className={`${textSizes.helper} text-red-500`}>{errors.zip}</p>}
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY (dynamic) */}
          <div className="w-full p-4 space-y-4 border sm:space-y-5 lg:col-span-4 rounded-xl sm:p-5 md:p-6">
            <h2 className={`${textSizes.sectionTitle} font-bold text-secondary`}>Order Summary</h2>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[16px] font-normal text-tertiary">{plan?.name || '-'}</span>
                <span className="text-[18px] font-medium text-secondary">
                  ${money(plan?.price)}/{billingLabel || '--'}
                </span>
              </div>
            </div>

            {!!summaryFeatures.length && (
              <ul className="ml-5 space-y-1 text-sm font-normal list-disc text-rare">
                {summaryFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}

            <hr />

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-[16px] font-normal text-tertiary">Subtotal: </span>
                <span className="text-[16px] font-normal text-secondary">${money(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[16px] font-normal text-tertiary">Tax:</span>
                <span className="text-[16px] font-normal text-secondary">${money(tax)}</span>
              </div>
            </div>

            <hr />

            <div className="flex justify-between">
              <span className="text-[18px] sm:text-[20px] font-bold text-secondary">Total Due Today</span>
              <span className="text-[18px] sm:text-[20px] font-bold text-primary">${totalDueToday}</span>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (e.target.checked) setErrors((prev) => ({ ...prev, terms: undefined }));
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

            {openTerms && <TermsAndConditionsModal closeModal={() => setOpenTerms(false)} />}

            <p className="text-sm text-tertiary">Renews automatically on {renewDate || '—'}. Cancel anytime.</p>

            <Button
              className="w-full !bg-primary !text-white py-3 rounded-md text-[16px] font-semibold"
              onClick={subscribeHandler}
              disabled={!plan}
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
