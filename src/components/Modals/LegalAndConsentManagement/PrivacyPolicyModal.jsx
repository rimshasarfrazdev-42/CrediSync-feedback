import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function PrivacyPolicyModal({ closeModal }) {
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
      <div ref={modalRef}  className="relative bg-white rounded-xl p-3 shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-secondary">Privacy Policy</h2>
          <button
            onClick={closeModal}
            aria-label="Close modal"
          >
            <img className='w-3 h-3 mr-3' src="/ConsentAndLegalInfo/crossIcon.svg" alt="cross icon" />
          </button>
        </div>
        <div className="flex-1 p-4 space-y-1 overflow-y-auto text-sm text-subtext">
          <p className="leading-tight ">
           CrediSync, Inc. ("CrediSync," "we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal and health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the CrediSync Provider Portal.
          </p>
          <div>
            <h3 className="mt-1 mb-2 ">Information We Collect</h3>
            <p className="mb-3 leading-tight ">
             We collect several types of information from and about users of our platform, including:
            </p>
            <p className="leading-tight ">
              Protected Health Information (PHI)
            </p>
          </div>
          <div>
            <ul className="ml-4 ">
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Medical licenses and board certifications</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>DEA (Drug Enforcement Administration) registration numbers</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>National Provider Identifier (NPI) numbers</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Malpractice insurance and claims history</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Hospital privileges and affiliations</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mt-2 mb-2">Contact Information</h3>
            <ul className="mb-1 ml-4">
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Full name and professional credentials</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Email address and phone number</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Practice address and mailing address</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Emergency contact information</span>
              </li>
              
            </ul>
            <p className="mb-1 leading-relaxed ">
             License and Credential Details
            </p>
            <ul className="ml-4 ">
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Educational background (medical school, residency, fellowships)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Specialty and sub-specialty certifications</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Continuing Medical Education (CME) credits</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Work history and employment verification</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Professional references</span>
              </li>
            </ul>
            <p className="mb-1 leading-relaxed ">
             Technical and Usage Information
            </p>
            <ul className="ml-4 ">
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>IP address and device information</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Browser type and operating system</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Login timestamps and activity logs</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Pages viewed and features used</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium  min-w-fit">•</span>
                <span>Cookies and similar tracking technologies</span>
              </li>
            </ul>
            <p className="mb-1 leading-relaxed ">
            How We Use Your Data
            </p>
            <p className="mb-1 leading-relaxed ">
            CrediSync uses your information for verification and compliance purposes, including:
            </p>
            <p className="mb-1 leading-relaxed ">
          Credentialing and Verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
