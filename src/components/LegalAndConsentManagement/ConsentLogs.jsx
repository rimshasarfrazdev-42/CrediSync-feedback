import { useState } from 'react';
import { consentLogs } from '../../constants/consentLogsData';

import DocumentViewModal from '../Modals/CredentialVault/DocumentViewModal';
export default function ConsentLogsTable() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null); 
    document.body.style.overflow = 'auto';
  };
  const getStatusClass = (type) => {
    if (type === 'Accepted') return 'bg-green-100 text-green-800';
    if (type === 'Revoke') return 'bg-red-100 text-red-800';
    return '';
  };
  const handleRowClick = (log) => {
    setSelectedDocument(log);
    setIsModalOpen(true);
  };
  return (
    <div className="w-full p-4 overflow-x-auto bg-white">
      <h2 className="text-lg font-semibold">Consent Logs</h2>
      <p className="mb-4 text-sm text-tertiary">
        System-level record of user consent actions, including type, version, and timestamp.
      </p>
      <div className="overflow-hidden border border-gray-200 rounded-xl">
        <table className="min-w-full">
          <thead className="bg-tertiary/5">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">User ID</th>
              <th className="px-4 py-3 font-medium">Consent Type</th>
              <th className="px-4 py-3 font-medium">Document Type</th>
              <th className="px-4 py-3 font-medium">Version</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {consentLogs.map((log, idx) => (
              <tr
                key={idx}
                className="text-sm border-t cursor-pointer border-tertiary/10 text-tertiary hover:bg-gray-50"
                onClick={() => handleRowClick(log)}
              >
                <td className="px-4 py-3">{log.id}</td>
                <td className="px-4 py-3 font-semibold">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(log.type)}`}>
                    {log.type}
                  </span>
                </td>
                <td className="px-4 py-3">{log.doc}</td>
                <td className="px-4 py-3">{log.version}</td>
                <td className="px-4 py-3">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DocumentViewModal isOpen={isModalOpen}  onClose={closeModal} documentData={selectedDocument} />
    </div>
  );
}
