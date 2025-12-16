import { useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export function DocumentModal({ isOpen, onClose, documentData }) {
  if (!isOpen || !documentData) return null;
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);
  useEffect(() => {
    if(isOpen){
    document.body.style.overflow = 'hidden';}
    return () => {
      document.body.style.overflow = 'auto !important';
    };
  }, [isOpen]);
  const { doc: title, version, id: userId, timestamp: dateAccepted, type: consentType } = documentData;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 bg-secondary/80"  ></div>
      <div ref={modalRef} className="relative z-10 flex flex-col w-full max-w-lg mx-auto overflow-hidden bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between px-6 pt-4 pb-0">
          <div className="flex items-center gap-2">
            <img src="/ConsentAndLegalInfo/checkedFile.svg" alt="checked File Icon" />
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-tertiary">Document Details</p>
            </div>
          </div>
          <button onClick={onClose}>
            <img src="/ConsentAndLegalInfo/crossIcon.svg" alt=" corss Icon" />
          </button>
        </div>
        <div className="px-6 py-4 space-y-3 text-sm text-primary ">
          <div className="flex justify-between">
            <span className="font-medium text-tertiary">Full Title:</span>
            <span>{title}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-tertiary">Version:</span>
            <span>{version}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-tertiary">User ID:</span>
            <span>{userId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-tertiary">Date Accepted:</span>
            <span>{dateAccepted}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-tertiary">Consent Type:</span>
            <span>{consentType}</span>
          </div>
          <div className='flex w-full gap-2 px-2 py-3 mt-8 text-xs rounded-md bg-tertiary/10 text-subtext'>
         
          <img src="/ConsentAndLegalInfo/noticeIcon.svg" alt="notice Icon" />
           <div className="">
            
            You accepted this document ({version}) on {dateAccepted}.
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
