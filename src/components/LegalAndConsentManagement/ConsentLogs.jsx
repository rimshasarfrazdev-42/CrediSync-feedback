import { useState } from 'react';
import { consentLogs } from '../../constants/consentLogsData';
import { DocumentModal } from '../Modals/LegalAndConsentManagement/DocumentModal';
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
    <div className="w-full p-4 bg-white">
      <h2 className="text-lg font-semibold">Consent Logs</h2>
      <p className="mb-4 text-sm text-tertiary">
        System-level record of user consent actions, including type, version, and timestamp.
      </p>
      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-tertiary/5">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium whitespace-nowrap">User ID</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Consent Type</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Document Type</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Version</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {consentLogs.map((log, idx) => (
              <tr
                key={idx}
                className="text-sm border-t cursor-pointer border-tertiary/10 text-tertiary hover:bg-gradient-to-r from-[#F4F9FF] to-[#F8FAFC]"
                onClick={() => handleRowClick(log)}
              >
                <td className="px-4 py-3 whitespace-nowrap">{log.id}</td>
                <td className="px-4 py-3 font-semibold whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(log.type)}`}>
                    {log.type}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{log.doc}</td>
                <td className="px-4 py-3 whitespace-nowrap">{log.version}</td>
                <td className="px-4 py-3 whitespace-nowrap">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DocumentModal isOpen={isModalOpen} onClose={closeModal} documentData={selectedDocument} />
    </div>
  );
}
