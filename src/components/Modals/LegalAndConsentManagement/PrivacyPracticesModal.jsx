import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function PrivacyPracticeModal({ closeModal }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
      <div className="absolute inset-0 bg-secondary/80 "></div>
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl p-3 shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">HIPAA Notice of Privacy Practices</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 transition hover:text-gray-700"
            aria-label="Close modal"
          >
            <img className="w-3 h-3 mr-3" src="/ConsentAndLegalInfo/crossIcon.svg" alt="cross icon" />
          </button>
        </div>
        <div
          className="flex items-center max-w-4xl px-2 py-3 mx-auto mt-4 space-x-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm "
        >
          <img src="/ConsentAndLegalInfo/noticeIcon.svg" alt="noticeIcon" />
          <p className="text-primary text-[13.5px]">
            This notice describes how your medical information may be used and disclosed and how you can get access to
            this information.
          </p>
        </div>
        <div className="flex-1 p-4 space-y-1 overflow-y-auto text-sm text-subtext">
          <p className="leading-tight ">
            This Notice of Privacy Practices describes how CrediSync, Inc. may use and disclose your Protected Health
            Information (PHI) to carry out treatment, payment, or healthcare operations, and for other purposes
            permitted or required by law. It also describes your rights to access and control your PHI.
          </p>
          <div>
            <h3 className="mt-1 mb-2 ">Effective Date: October 20, 2025</h3>
            <p className="mb-3 leading-tight ">Your HIPAA Rights</p>
            <p className="mb-3 leading-tight ">
              When it comes to your health information, you have certain rights under the Health Insurance Portability
              and Accountability Act (HIPAA). This section explains your rights and some of our responsibilities to help
              you.
            </p>
            <p className="mb-3 leading-tight ">Right to Inspect and Copy</p>
            <p className="mb-3 leading-tight ">
              You have the right to inspect and obtain a copy of your health information that may be used to make
              decisions about your credentials. This includes:
            </p>
          </div>
          <div>
            <ul className="ml-4 ">
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Credentialing files and verification records</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>License and certification documentation</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Application history and status updates</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Audit logs of information disclosures</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mt-2 mb-2">
              To inspect and copy your health information, submit a written request to our HIPAA Privacy Officer. We may
              charge a reasonable, cost-based fee for copying and mailing costs.
            </h3>
            <p className="mb-2 leading-tight ">Right to Amend</p>
            <p className="mb-2 leading-tight ">
              If you believe health information we have about you is incorrect or incomplete, you may ask us to amend
              it. You have the right to request an amendment as long as the information is kept by or for CrediSync.
            </p>
            <p className="mb-2 leading-tight ">
              To request an amendment, submit a written request to our HIPAA Privacy Officer, clearly identifying the
              information you want changed and providing a reason to support your request. We may deny your request if
              the information was not created by us, is not part of the records we maintain, or is already accurate and
              complete.
            </p>
            <p className="mb-2 leading-tight ">Right to an Accounting of Disclosures</p>
            <p className="mb-2 leading-tight ">
              You have the right to request an "accounting of disclosures" — a list of certain disclosures we have made
              of your PHI. This does not include:
            </p>
            <ul className="mb-1 ml-4">
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Disclosures made with your authorization</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Disclosures for credentialing purposes</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Disclosures to you or your authorized representative</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
