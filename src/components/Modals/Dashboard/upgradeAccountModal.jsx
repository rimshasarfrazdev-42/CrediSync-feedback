import { useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function UpgradeAccountModal({ closeModal }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, closeModal);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80"></div>
      <div ref={modalRef} className="relative bg-white rounded-xl shadow-xl w-[520px] p-6 z-50">
        <h2 className="flex justify-between text-lg font-semibold text-secondary">
          Upgrade your account
          <img className="cursor-pointer" src="/Dashboard/close.svg" alt="Close Icon" onClick={closeModal} />
        </h2>
        <p className="mt-1 text-sm text-tertiary max-w-96">
          Upgrade to unlock automated verification, full readiness score, secure sharing
        </p>
        <div className="flex items-center justify-between gap-4 mt-8">
          <button className="w-full py-3 font-medium text-white transition rounded-md bg-primary hover:bg-primary/95">
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
}
