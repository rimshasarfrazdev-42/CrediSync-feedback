import React from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

function CancelSubscriptionModal({ open, onClose, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal Box */}
      <div className="absolute inset-0 bg-secondary/80"></div>
      <div className="relative bg-white rounded-xl shadow-xl w-[520px] p-6 z-50">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary">Cancel Subscription</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-tertiary hover:text-secondary" />
          </button>
        </div>

        {/* Content */}
        <p className="mb-6 text-sm text-tertiary">
          Are you sure you want to cancel your subscription? You will lose access at the end of your current billing
          cycle.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="w-1/2">
            Keep Subscription
          </Button>

          <Button onClick={onConfirm} disabled={loading} className="w-1/2 text-white bg-red-500 hover:bg-red-600">
            {loading ? 'Cancelling...' : 'Yes, Cancel'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CancelSubscriptionModal;
