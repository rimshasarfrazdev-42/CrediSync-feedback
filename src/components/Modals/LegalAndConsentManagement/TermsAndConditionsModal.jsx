import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function TermsAndConditionsModal({ closeModal }) {
    const modalRef = useRef(null);
    useClickOutside(modalRef, closeModal);
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 !mt-0 ">
      <div className="absolute inset-0 bg-secondary/80 "></div>
      <div ref={modalRef}  className="relative bg-white rounded-xl p-3 shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Terms & Conditions</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 transition hover:text-gray-700"
            aria-label="Close modal"
          >
            <img className='w-3 h-3 mr-3' src="/ConsentAndLegalInfo/crossIcon.svg" alt="cross icon" />
          </button>
        </div>
        <div className="flex-1 p-4 space-y-1 overflow-y-auto text-sm text-subtext">
          <p className="leading-tight ">
            By creating a CrediSync account, you agree to comply with our data-handling and credentialing policies outlined below. These Terms & Conditions govern your use of the CrediSync Provider Portal and related services.
          </p>
          <div>
            <h3 className="mt-1 mb-2 ">Agreement Overview</h3>
            <p className="mb-3 leading-tight ">
              This agreement ("Agreement") is entered into between you ("Provider," "You," or "User") and CrediSync, Inc. ("CrediSync," "We," or "Us"). By accessing or using the CrediSync Provider Portal, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
            <p className="leading-tight ">
              The CrediSync Provider Portal is a HIPAA and SOC 2-compliant healthcare credentialing platform designed to streamline the verification and management of healthcare provider credentials. Your use of this platform constitutes acceptance of these terms in their entirety.
            </p>
          </div>
          <div>
            <h3 className="mt-3 mb-2 ">User Responsibilities</h3>
            <p className="mb-2 leading-relaxed">
              As a user of the CrediSync Provider Portal, you agree to:
            </p>
            <ul className="ml-4 ">
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Provide accurate, current, and complete information during registration and credentialing processes</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Maintain the confidentiality of your account and notify us of any unauthorized access</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Use the platform solely for lawful purposes related to healthcare credentialing</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Comply with all applicable laws, regulations, and HIPAA requirements</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Keep your professional licenses, certifications, and credentials current and valid</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Promptly update any changes to your personal or professional information</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Not share, sell, or transfer your account access to any third party</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mt-2 mb-2">Data Usage & Security</h3>
            <p className="mb-2 leading-tight ">
              CrediSync collects and processes personal and professional information necessary for healthcare credentialing purposes. This includes, but is not limited to:
            </p>
            <ul className="mb-1 ml-4">
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Professional licenses and certifications</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Educational background and training history</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Work history and references</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>National Provider Identifier (NPI) and DEA numbers</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Malpractice insurance information</span>
              </li>
            </ul>
            <p className="mb-1 leading-relaxed ">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="ml-4 ">
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>End-to-end encryption for data transmission</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Secure cloud storage with redundant backups</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Multi-factor authentication protections</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Regular security audits and penetration testing</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium min-w-fit">•</span>
                <span>Role-based access controls</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
