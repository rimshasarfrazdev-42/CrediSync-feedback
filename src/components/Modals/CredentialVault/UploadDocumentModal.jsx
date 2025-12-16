import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
const UploadDocumentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);
  const [selectDocument, setselectDocumentOpen] = useState(false);
  const [selectedDocument, setselectedDocument] = useState('Select document type');
  const documentTypeRef = useRef(null);
  const handleSelectOption = (value, setState, closeMenu) => {
    setState(value);
    closeMenu(false);
  };
  useClickOutside(documentTypeRef, () => setselectDocumentOpen(false));
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80 "></div>
      <div ref={modalRef} className="relative bg-white rounded-xl shadow-xl w-[520px] p-6 z-50">
        <h2 className="text-xl font-semibold text-secondary">Upload New Document</h2>
        <p className="text-sm text-tertiary ">Add a new credential or certification to your vault</p>
        <div className="mt-3 space-y-3">
          <div className="grid w-full grid-cols-1 gap-4" ref={documentTypeRef}>
            <div>
              <label className="text-[16px] font-medium text-secondary mb-1">Document Type</label>
              <button
                onClick={() => setselectDocumentOpen(!selectDocument)}
                className="border text-tertiary border-tertiary-30 rounded-md focus:border-primary px-3 py-2 text-sm flex items-center justify-between gap-1 text-[16px]   mb-1 w-full"
              >
                {selectedDocument}
                <img src="/Dashboard/downArrows.svg" alt="Down arrow" />
              </button>
              {selectDocument && (
                <div className="absolute bg-white shadow-lg rounded-md border z-20 w-[90%] ">
                  {['PDF', 'JPG', 'PNG', 'DOCX'].map((option, i) => (
                    <p
                      key={i}
                      onClick={() => handleSelectOption(option, setselectedDocument, setselectDocumentOpen)}
                      className="px-3  text-[13px] hover:bg-dashboard cursor-pointer w-full  rounded-md py-1.5 bg-white focus:outline-none  "
                    >
                      {option}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-base font-medium text-secondary">Issuing Organization (Optional)</label>
            <input
              type="text"
              placeholder="e.g.. California Medical Board"
              className="w-full outline-none border rounded-md mt-1 p-2.5 text-sm focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-base font-medium text-secondary">Issue Date (Optional)</label>
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                className="w-full outline-none border rounded-md mt-1 p-2.5 text-sm focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-base font-medium text-secondary">Expire Date (Optional)</label>
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                className="w-full outline-none border rounded-md mt-1 p-2.5 text-sm focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-base font-medium text-secondary">Upload File (Optional)</label>
            <div className="relative mt-1">
              <input type="file" className="w-full border rounded-lg p-2.5 text-sm text-tertiary" />
            </div>
            <p className="mt-2 text-sm text-tertiary">Accepted formats: PDF, JPG, PNG (Max 10MB)</p>
          </div>
        </div>
        <div className="flex justify-between gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-full py-2 border rounded-md border-subtext text-tertiary hover:bg-tertiary/10"
          >
            Cancel
          </button>
          <button className="w-full py-2 text-white rounded-md bg-primary hover:bg-primary/90">Upload</button>
        </div>
      </div>
    </div>
  );
};
export default UploadDocumentModal;
