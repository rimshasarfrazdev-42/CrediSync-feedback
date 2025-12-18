import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import DelegatedAccessEmptyState from './DelegatedAccessEmptyState';




import { Input } from '../../components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select';

import {
  getDelegates,
  addDelegate,
  updateDelegate,
  removeDelegate,
} from '../../constants/delegatesData';
import AddDelegateDialog from '../Modals/DelegateAccessTab/addDelegateDialogModal';
import EditDelegateAccessDialog from '../Modals/DelegateAccessTab/editDelegateAccessDialogModal';
import RevokeDelegateDialog from '../Modals/DelegateAccessTab/revokeDelegateDialogModal';

// status pill
const getStatusBadge = (status) => {
  let className = '';
  switch (status) {
    case 'Active':
      className = 'bg-[#ECFDF5] text-[#22C55E]';
      break;
    case 'Pending':
      className = 'bg-[#FFFBEB] text-[#D7AE0B]';
      break;
    case 'Revoked':
    case 'Inactive':
      className = 'text-red-800 bg-red-100';
      break;
    default:
      className = 'text-gray-800 bg-gray-100';
  }
  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${className}`}>
      {status}
    </span>
  );
};

// Access Level Selector in table row
const AccessLevelSelector = ({ initialValue, status, onChange }) => {
  const [accessLevel, setAccessLevel] = React.useState(initialValue);

  React.useEffect(() => {
    setAccessLevel(initialValue);
  }, [initialValue]);

  const handleValueChange = (newValue) => {
    setAccessLevel(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Select
      value={accessLevel}
      onValueChange={handleValueChange}
      disabled={status === 'Pending'}
    >
      <SelectTrigger className="w-[140px] h-9 text-sm text-secondary border-gray-300">
        <SelectValue placeholder="Select Access" />
      </SelectTrigger>
      <SelectContent className="z-50 bg-white border border-gray-300 shadow-lg ">
        <SelectItem value="View Only">View Only</SelectItem>
        <SelectItem value="View & Edit">View & Edit</SelectItem>
      </SelectContent>
    </Select>
  );
};

function DelegatedAccessContainer() {
  const [allDelegates, setAllDelegates] = useState([]);

  const textSecondary = 'text-secondary';
  const textTertiary = 'text-tertiary';

  // load from localStorage on mount
  useEffect(() => {
    setAllDelegates(getDelegates());
  }, []);

  // handlers using data file
  const handleAddDelegate = (payload) => {
    const updated = addDelegate(payload);
    setAllDelegates(updated);
  };

  const handleUpdateAccess = (id, newAccess) => {
    const updated = updateDelegate(id, { access: newAccess });
    setAllDelegates(updated);
  };

  const handleRevokeDelegate = (id) => {
    const updated = removeDelegate(id);
    setAllDelegates(updated);
  };

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-6 p-4 bg-white border border-gray-200 min-h-60 sm:p-6 lg:rounded-r-xl rounded-b-xl">
        {/* Top Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Content */}
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 sm:text-xl">
              Delegated Access
            </h2>
            <p className={`text-sm sm:text-base font-normal ${textTertiary}`}>
              Manage who can access and help manage your CrediSync account. You control who can
              view or update your information.
            </p>
          </div>

          {/* Add Delegate Modal */}
          <AddDelegateDialog onAdd={handleAddDelegate} />
        </div>

        {/* Table / Empty State */}
        {allDelegates && allDelegates.length > 0 ? (
          <div className="w-full overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}
                  >
                    Delegate Name
                  </th>
                  <th
                    scope="col"
                    className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}
                  >
                    Role / Organization
                  </th>
                  <th
                    scope="col"
                    className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}
                  >
                    Access Level
                  </th>
                  <th
                    scope="col"
                    className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className={`px-4 py-3 text-left text-sm font-semibold ${textSecondary} tracking-wider`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {allDelegates.map((delegate) => (
                  <tr
                    key={delegate.id}
                    className="transition-colors duration-150 hover:bg-gray-50"
                  >
                    <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${textTertiary}`}>
                      {delegate.firstName} {delegate.lastName}
                    </td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${textTertiary}`}>
                      {delegate.email}
                    </td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${textTertiary}`}>
                      {delegate.role}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <AccessLevelSelector
                        initialValue={delegate.access}
                        status={delegate.status}
                        onChange={(value) => handleUpdateAccess(delegate.id, value)}
                      />
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {getStatusBadge(delegate.status)}
                    </td>
                    <td className="px-4 py-4 space-x-2 text-sm whitespace-nowrap">
                      <EditDelegateAccessDialog
                        delegate={delegate}
                        onSaveAccess={handleUpdateAccess}
                      />
                      <RevokeDelegateDialog
                        delegate={delegate}
                        onRevoke={handleRevokeDelegate}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <DelegatedAccessEmptyState />
        )}

        {/* Bottom Security Note */}
        <div className="flex items-start justify-center w-full gap-2 px-2 mt-2 text-center sm:items-center sm:text-left text-primary">
          <Lock className="flex-shrink-0 w-4 h-4 mt-1 sm:mt-0 text-primary" />
          <span className={`leading-snug ${textTertiary} text-sm sm:text-base font-normal`}>
            Your information is securely verified against official medical databases. No PHI is
            shared without your consent.
          </span>
        </div>
      </div>
    </div>
  );
}

export default DelegatedAccessContainer;
