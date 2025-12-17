import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
const UploadDocumentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);
  const [selectDocument, setSelectDocumentOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState('');
  const documentTypeRef = useRef(null);
  useClickOutside(documentTypeRef, () => setSelectDocumentOpen(false));
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [file, setFile] = useState(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);
  const handleSelectOption = (value) => {
    setSelectedDocument(value);
    setSelectDocumentOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80" />
      <div ref={modalRef} className="relative bg-white rounded-xl shadow-xl w-[520px] p-6 z-50">
        <h2 className="text-xl font-semibold text-secondary">Upload New Document</h2>
        <p className="text-sm text-tertiary">Add a new credential or certification to your vault</p>
        <div className="mt-4 space-y-4">
          <div ref={documentTypeRef} className="relative">
            <label className="text-base font-medium text-secondary mb-1">Document Type</label>
            <button
              onClick={() => setSelectDocumentOpen(!selectDocument)}
              className={`border rounded-md px-3 py-2 w-full flex justify-between items-center
                ${selectedDocument ? 'text-secondary' : 'text-tertiary'}`}
            >
              {selectedDocument || 'Select document type'}
              <img src="/Dashboard/downArrows.svg" alt="arrow" />
            </button>
            {selectDocument && (
              <div className="absolute mt-1 bg-white border rounded-md shadow-lg z-20 w-full">
                {['PDF', 'JPG', 'PNG', 'DOCX'].map((opt) => (
                  <p
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC]"
                  >
                    {opt}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-base font-medium text-secondary">Issuing Organization (Optional)</label>
            <input
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. California Medical Board"
              className={`w-full border rounded-md mt-1 p-2.5 text-sm focus:ring-1 focus:ring-primary
                ${issuer ? 'text-secondary' : 'text-tertiary'}`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-base font-medium text-secondary">Issue Date (Optional)</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className={`w-full border rounded-md mt-1 p-2.5 text-sm focus:ring-1 focus:ring-primary
                  ${issueDate ? 'text-secondary' : 'text-tertiary'}`}
              />
            </div>
            <div>
              <label className="text-base font-medium text-secondary">Expire Date (Optional)</label>
              <input
                type="date"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                className={`w-full border rounded-md mt-1 p-2.5 text-sm focus:ring-1 focus:ring-primary
                  ${expireDate ? 'text-secondary' : 'text-tertiary'}`}
              />
            </div>
          </div>
          <div>
            <label className="text-base font-medium text-secondary">Upload File (Optional)</label>

            <div
              onClick={() => document.getElementById('fileUpload').click()}
              className={`mt-1 flex items-center justify-between gap-2 border rounded-lg px-3 py-2.5 cursor-pointer
      ${file ? 'text-secondary' : 'text-tertiary'}
    `}
            >
              <span className="text-sm truncate">{file ? file.name : 'file upload - PDF/JPG/DOCX'}</span>

              <img src="/CredentialVault/upload2.svg" alt="upload" className="w-5 h-5 opacity-70" />
            </div>
            <input
              id="fileUpload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="mt-2 text-sm text-tertiary">Accepted formats: PDF, JPG, PNG (Max 10MB)</p>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="w-full py-2 border rounded-md text-tertiary hover:bg-tertiary/10">
            Cancel
          </button>
          <button className="w-full py-2 text-white rounded-md bg-primary hover:bg-[#093759]">Upload</button>
        </div>
      </div>
    </div>
  );
};
export default UploadDocumentModal;
