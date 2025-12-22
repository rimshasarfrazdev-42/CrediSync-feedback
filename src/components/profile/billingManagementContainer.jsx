import { Button } from '../../components/ui/button';
import React, { useState } from "react";
import { FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CancelSubscriptionModal from '../Modals/cancelSubscriptionModal';
function BillingManagementContainer() {
  const invoices = [
    { id: 'INV-001245', date: 'Oct 31, 2025', amount: '$29.99', status: 'Paid' },
    { id: 'INV-001213', date: 'Sep 30, 2025', amount: '$29.99', status: 'Paid' },
    { id: 'INV-001181', date: 'Aug 31, 2025', amount: '$29.99', status: 'Paid' },
  ];

  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const textSecondary = 'text-secondary';
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="grid w-full grid-cols-1 gap-6 p-4 bg-white border sm:p-6 min-h-60 border-tertiary/15 rounded-b-xl lg:rounded-tr-xl">
        {/* Current Plan Card */}
        <div className="w-full p-4 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-6">
          {/* Top Section */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left */}
            <div>
              <h2 className="flex items-center gap-2 text-[18px] sm:text-[20px] md:text-[25px] font-bold text-secondary">
                Professional Plan
                <span className="text-[11px] sm:text-[12px] bg-green-100 text-green-600 font-medium px-3 sm:px-4 py-1 rounded-full">
                  Active
                </span>
              </h2>
              <p className="mt-1 text-xs font-normal sm:text-sm text-tertiary">Your current subscription</p>
            </div>

            {/* Price */}
            <div className="text-left md:text-right">
              <p className="text-[18px] sm:text-[20px] md:text-[25px] font-bold text-secondary">$29.99/month</p>
              <p className="text-xs font-normal sm:text-sm text-tertiary">Recurring charge</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px my-4 bg-gray-200"></div>

          {/* Billing Info */}
          <div>
            <p className="text-[14px] sm:text-[16px] text-tertiary font-normal">Next Billing Date</p>
            <p className="mt-1 text-[16px] sm:text-[18px] font-semibold text-medium">Renews on Dec 25, 2025</p>
            <p className="mt-1 text-xs font-normal sm:text-sm text-tertiary">
              Your subscription renews automatically each billing cycle. Cancel anytime.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:items-center">
            <Button
              onClick={() => {
                navigate('/choose-plan');
              }} // Placeholder for actual click handler
              className="bg-primary text-white text-[14px] sm:text-[16px] font-semibold w-full sm:w-auto"
            >
              Change Plan
            </Button>

            {/* <Button className="bg-[#07244B] text-white text-[14px] sm:text-[16px] font-semibold border w-full sm:w-auto">
              Update Payment Method
            </Button> */}
            <Button
              onClick={() => setOpenCancelModal(true)}
              className="border border-red-500 text-red-500 text-[14px] sm:text-[16px] font-semibold rounded-md bg-white w-full sm:w-auto"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
<CancelSubscriptionModal
  open={openCancelModal}
  onClose={() => setOpenCancelModal(false)}
  loading={loadingCancel}
  onConfirm={() => {
    setLoadingCancel(true);

    //  Call API here
    setTimeout(() => {
      setLoadingCancel(false);
      setOpenCancelModal(false);
      console.log("Subscription cancelled");
    }, 1500);
  }}
/>
        {/* Billing History Card */}
        <div className="w-full p-4 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-6">
          <div className="w-full">
            <h1 className={`text-[20px] sm:text-[25px] font-bold mb-4 sm:mb-6 ${textSecondary}`}>Billing History</h1>

            {/* Desktop / Tablet Table */}
            <div className="hidden sm:block">
              <div className="w-full max-w-full bg-white border-[1px] border-tertiary/25 rounded-xl shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-tertiary/10">
                    <tr>
                      <th className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}>
                        Invoice
                      </th>
                      <th className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}>
                        Date
                      </th>
                      <th className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}>
                        Amount
                      </th>
                      <th className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {invoices.map((invoice, index) => (
                      <tr key={index} className="transition-colors duration-150 hover:bg-gray-50">
                        <td className="flex items-center gap-2 px-4 py-4 text-sm font-normal cursor-pointer whitespace-nowrap text-tertiary">
                          <div className="flex items-center justify-center w-5 h-5 p-1 bg-primary/10 rounded-[5px]">
                            <FileText size={18} className="text-primary" />
                          </div>
                          {invoice.id}
                        </td>
                        <td className="px-4 py-4 text-sm font-normal whitespace-nowrap text-tertiary">
                          {invoice.date}
                        </td>
                        <td className="px-4 py-4 text-sm font-normal whitespace-nowrap text-tertiary">
                          {invoice.amount}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <span className="inline-flex px-4 py-1 text-xs font-semibold leading-5 text-[#22C55E] bg-[#22C55E]/10 rounded-full">
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden">
              <div className="space-y-3">
                {invoices.map((invoice, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-3 bg-white border shadow-sm border-tertiary/25 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                          <FileText size={18} className="text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-tertiary">{invoice.id}</p>
                      </div>
                      <span className="inline-flex px-3 py-1 text-[11px] font-semibold leading-5 text-[#22C55E] bg-[#22C55E]/10 rounded-full">
                        {invoice.status}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs text-tertiary">
                      <span>
                        Date: <span className="font-medium">{invoice.date}</span>
                      </span>
                      <span>
                        Amount: <span className="font-medium">{invoice.amount}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compliance / Security Card */}
        <div className="grid gap-4">
          <div className="p-4 transition-shadow border rounded-lg hover:shadow-md">
            {/* Icon + Heading */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1 text-primary">
                <Shield size={25} />
              </div>

              <p className="text-[18px] sm:text-[20px] font-semibold">WCAG 2.1 AA Compliant</p>
            </div>

            {/* Description (aligned under heading) */}
            <p className="mt-2 ml-[37px] text-[14px] sm:text-[16px] font-normal text-rare">
              All payment information is encrypted and processed securely via Stripe. CrediSync is HIPAA &amp; SOC 2
              compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingManagementContainer;
