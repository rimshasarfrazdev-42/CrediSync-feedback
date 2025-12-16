import { useState } from 'react';
import { items } from '../../constants/itemsData';
import TermsAndConditionsModal from '../../components/Modals/LegalAndConsentManagement/TermsAndConditionsModal';
import PrivacyPolicyModal from '../../components/Modals/LegalAndConsentManagement/PrivacyPolicyModal';
import PrivacyPracticeModal from '../../components/Modals/LegalAndConsentManagement/PrivacyPracticesModal';
export default function LegalAndConsentInfo({closeModal}) {
  const [activeModal, setActiveModal] = useState(null);
  const openModal = (type) => setActiveModal(type);
  const closeActiveModal = () => setActiveModal(null);

  return (
    <div className="w-full p-4 bg-white">
      <h2 className="text-lg font-semibold text-secondary">Consent & Legal Information</h2>
      <p className="mt-1 text-sm text-tertiary">
        Review and accept our legal documents to continue using the CrediSync Provider Portal.
      </p>
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col h-full p-5 transition bg-white border shadow-sm border-tertiary/20 rounded-xl hover:shadow-md"
          >
            <div className="flex items-center justify-center rounded-lg w-11 h-11 bg-blue-50">
              <img src={item.icon} alt={item.title} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-tertiary">{item.description}</p>
            <ul className="mt-3 mb-2 space-y-1 text-sm text-tertiary">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 text-tertiary">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-auto w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-medium transition"
              onClick={() => openModal(item.modalType)}
            >
              Review
            </button>
          </div>
        ))}
      </div>
      <div className="p-5 mt-4 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-start gap-3">
          <img src="/ConsentAndLegalInfo/privacyPractice.svg" alt="Privacy practice Icon" />
          <div>
            <h3 className="text-base font-semibold text-secondary">WCAG 2.1 AA Compliant</h3>
            <p className="mt-1 text-sm text-tertiary">
              All legal documents are accessible via keyboard navigation and screen readers. Our platform meets Web
              Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium">
              <div className="flex items-center gap-1 ">
                <img src="/ConsentAndLegalInfo/checkCircle.svg" alt="Checked Circle" />
                <span className="py-1">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/ConsentAndLegalInfo/checkCircle.svg" alt="Checked Circle" />
                <span className="py-1">SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/ConsentAndLegalInfo/checkCircle.svg" alt="Checked Circle" />
                <span className="py-1">End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
     {activeModal === "PrivacyPolicy" && (
        <PrivacyPolicyModal closeModal={closeActiveModal} />
      )}

      {activeModal === "TermsAndConditions" && (
        <TermsAndConditionsModal closeModal={closeActiveModal} />
      )}

      {activeModal === "PrivacyPractices" && (
        <PrivacyPracticeModal closeModal={closeActiveModal} />
      )}
    </div>
  );
}
