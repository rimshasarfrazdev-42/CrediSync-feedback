import { useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
export default function DeleteDocumentModal({ doc, onClose, onConfirmDelete }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);
  if (!doc) return null;
  const handleDelete = () => {
    console.log('Deleting document:', doc);
    onConfirmDelete();
    onClose();
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80"></div>
      <div ref={modalRef} className="relative w-full max-w-lg p-6 bg-white shadow-xl  rounded-xl">
        <h2 className="mb-4 text-xl font-semibold text-secondary">Delete Document</h2>
        <p className="mb-6 text-sm leading-relaxed text-tertiary">
          Are you sure you want to permanently delete this document? This action cannot be undone.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 font-medium transition-colors bg-white border rounded-lg border-secondary text-tertiary hover:bg-tertiary/10"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-6 py-3 font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
