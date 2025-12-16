// ChecklistTab.jsx
import React, { useState } from 'react';
import SetReminderModal from '../Modals/checklistandNotification/setReminderModal';
import HospitalPrivilegeModal from '../Modals/checklistandNotification/hospitalPrivilegeModal';
import MarkNotApplicableModal from '../Modals/checklistandNotification/markNotApplicableModal';
import UploadDocumentModal from '../Modals/checklistandNotification/UploadDocumentModal';

const STATUS_CONFIG = {
  active: {
    label: 'Active',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    dotClass: 'bg-emerald-500',
    progressClass: 'bg-emerald-500',
  },
  pending: {
    label: 'Pending',
    badgeClass: 'bg-amber-100 text-amber-700',
    dotClass: 'bg-amber-400',
    progressClass: 'bg-amber-400',
  },
  expired: {
    label: 'Expired',
    badgeClass: 'bg-rose-100 text-rose-600',
    dotClass: 'bg-rose-400',
    progressClass: 'bg-rose-400',
  },
  // Missing is visually “red” like in the screenshot
  missing: {
    label: 'Missing',
    badgeClass: 'bg-red-50 text-red-600',
    dotClass: 'bg-red-500',
    progressClass: 'bg-red-500',
  },
};

function TimeIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.5V10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 6.2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="4.4" r="0.7" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 10.2 9 11.7l3-3.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="none">
      <path
        d="M6 2.5A1.5 1.5 0 0 1 7.5 1h5.086a1.5 1.5 0 0 1 1.06.44l3.414 3.414A1.5 1.5 0 0 1 17 5.914V16.5A1.5 1.5 0 0 1 15.5 18h-9A1.5 1.5 0 0 1 5 16.5v-14Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M12 1.25V4a1 1 0 0 0 1 1h2.75" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Top progress bar + legend */
function ChecklistProgress({ items }) {
  const counts = items.reduce(
    (acc, item) => {
      if (acc[item.status] !== undefined) acc[item.status] += 1;
      return acc;
    },
    { active: 0, pending: 0, expired: 0, missing: 0 },
  );

  const total = counts.active + counts.pending + counts.expired + counts.missing || 1;

  // Show segments in the order visible in the screenshot: Active → Pending → Missing
  const order = ['active', 'pending', 'missing'];
  const segments = order.filter((key) => counts[key] > 0);

  return (
    <div className="px-4 py-3 mt-3 bg-white border rounded-2xl border-slate-200 sm:px-5 sm:py-4">
      {/* bar */}
      <div className="w-full h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="flex w-full h-3">
          {segments.map((key, idx) => (
            <div
              key={key}
              style={{ width: `${(counts[key] / total) * 100}%` }}
              className={`${STATUS_CONFIG[key].progressClass} ${
                idx === 0 ? 'rounded-l-full' : ''
              } ${idx === segments.length - 1 ? 'rounded-r-full' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-slate-600">
        {order.map((key) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${STATUS_CONFIG[key].dotClass}`} />
            <span className="font-medium">
              {STATUS_CONFIG[key].label} ({counts[key]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Single card row */
function ChecklistItemCard({ item, onAction }) {
  const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          {/* title + status pill */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-secondary sm:text-base">{item.title}</h3>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusCfg.badgeClass}`}
            >
              {statusCfg.label}
            </span>
          </div>

          {/* time + tooltip */}
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            <TimeIcon />
            <span>{item.estimatedTime}</span>
            {item.tooltip && (
              <div className="relative inline-flex group">
                <InfoIcon />
                <div className="absolute z-10 hidden px-3 py-2 text-xs rounded-md shadow-lg pointer-events-none -left-2 top-5 w-60 bg-primary text-slate-50 group-hover:block">
                  {item.tooltip}
                </div>
              </div>
            )}
          </div>

          {/* main description */}
          {item.description && (
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">{item.description}</p>
          )}

          {/* sub label row */}
          {item.subLabel && (
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              {item.status === 'active' ? <TimeIcon /> : <DocumentIcon />}
              <span>{item.subLabel}</span>
            </div>
          )}

          {/* actions */}
          {(item.actions?.length > 0 || item.assignees?.length > 0) && (
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex flex-wrap gap-2">
                {item.actions?.map((action) => (
                  <button
                    key={action.id || action.label}
                    type="button"
                    onClick={() => onAction && onAction(action, item)}
                    className={
                      action.variant === 'primary'
                        ? 'inline-flex items-center rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#082b5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:text-sm'
                        : action.variant === 'ghost'
                        ? 'inline-flex items-center rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-slate-700 underline hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:text-sm'
                        : 'inline-flex items-center rounded-lg border border-primary px-3.5 py-2 text-xs font-medium text-primary hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:text-sm'
                    }
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Main checklist tab */
export default function ChecklistTab({ items, onChecklistAction }) {
  const [activeItem, setActiveItem] = useState(null);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [hospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [markNaModalOpen, setMarkNaModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [currentReminderDays, setCurrentReminderDays] = useState(15);

  const handleChecklistAction = (action, item) => {
    const label = action.label?.toLowerCase() || '';
    const id = (action.id || '').toLowerCase();

    const isRemindAction =
      id === 'remind-later' ||
      id === 'remind' ||
      label.includes('remind');

    const isHospitalAction =
      id === 'add-entry' ||
      id === 'hospital-privilege' ||
      label.includes('add entry');

    // NEW: upload document actions (“Upload Now”, etc.)
    const isUploadAction =
      id === 'upload-now' ||
      id === 'upload-document' ||
      label.includes('upload');

    // NEW: mark as not applicable actions (“Mark N/A”, etc.)
    const isMarkNaAction =
      id === 'mark-na' ||
      label.includes('mark n/a') ||
      label.includes('not applicable');

    if (isRemindAction) {
      setActiveItem(item);
      setReminderModalOpen(true);
      return;
    }

    if (isHospitalAction) {
      setActiveItem(item);
      setHospitalModalOpen(true);
      return;
    }

    if (isUploadAction) {
      setActiveItem(item);
      setUploadModalOpen(true);
      return;
    }

    if (isMarkNaAction) {
      setActiveItem(item);
      setMarkNaModalOpen(true);
      return;
    }

    // Fallback: bubble up to parent if provided
    if (onChecklistAction) {
      onChecklistAction(action, item);
    }
  };

  return (
    <>
      <div className="space-y-5 ">
        {/* heading */}
        <div>
          <h2 className="text-base font-semibold text-secondary sm:text-lg">
            Credential Checklist
          </h2>
          <p className="mt-1 text-xs text-tertiary sm:text-sm">
            Track your credential readiness and complete pending verifications.
          </p>
        </div>

        {/* progress bar + legend */}
        <ChecklistProgress items={items} />

        {/* cards */}
        <div className="space-y-4 sm:space-y-5">
          {items.map((item) => (
            <ChecklistItemCard
              key={item.id}
              item={item}
              onAction={handleChecklistAction}
            />
          ))}
        </div>
      </div>

      {/* Set Reminder Modal */}
      <SetReminderModal
        open={reminderModalOpen}
        initialDays={currentReminderDays}
        onClose={() => setReminderModalOpen(false)}
        onSave={({ days, isCustom }) => {
          setCurrentReminderDays(days);
          if (onChecklistAction && activeItem) {
            onChecklistAction(
              {
                id: 'set-reminder',
                type: 'reminder',
                payload: { days, isCustom },
              },
              activeItem,
            );
          }
        }}
      />

      {/* Add Hospital Privilege Modal */}
      <HospitalPrivilegeModal
        open={hospitalModalOpen}
        onClose={() => setHospitalModalOpen(false)}
        onSave={(data) => {
          if (onChecklistAction && activeItem) {
            onChecklistAction(
              {
                id: 'save-hospital-privilege',
                type: 'hospital-privilege',
                payload: data,
              },
              activeItem,
            );
          }
        }}
      />

      {/* Upload Document Modal */}
      <UploadDocumentModal
        open={uploadModalOpen}
        title="Upload Document"
        description={
          activeItem
            ? `Upload ${activeItem.title.toLowerCase()} documentation to complete this checklist item.`
            : 'Upload documentation to complete this checklist item.'
        }
        onClose={() => setUploadModalOpen(false)}
        onUpload={(file) => {
          if (onChecklistAction && activeItem) {
            onChecklistAction(
              {
                id: 'upload-document',
                type: 'upload',
                payload: { file },
              },
              activeItem,
            );
          }
        }}
      />

      {/* Mark as Not Applicable Modal */}
      <MarkNotApplicableModal
        open={markNaModalOpen}
        checklistItemName={activeItem?.title || ''}
        onClose={() => setMarkNaModalOpen(false)}
        onSubmit={(payload) => {
          if (onChecklistAction && activeItem) {
            onChecklistAction(
              {
                id: 'mark-na',
                type: 'not-applicable',
                payload,
              },
              activeItem,
            );
          }
        }}
      />
    </>
  );
}
