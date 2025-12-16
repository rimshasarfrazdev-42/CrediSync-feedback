// credentialData.js

// Checklist items (you can replace with API data later)
export const checklistItemsData = [
  {
    id: "medical-license",
    title: "Medical License",
    status: "active", // active | pending | expired | missing
    estimatedTime: "2–3 mins",
    description: "License verified successfully",
    subLabel: "Valid until Dec 2026",
   tooltip:
      "Required for all hospital onboarding and privileging processes.",
    actions: [],
    assignees: [],
  },
  {
    id: "malpractice-insurance",
    title: "Malpractice Insurance",
    status: "active",
    estimatedTime: "3–4 mins",
    description: "Professional liability coverage documentation",
    subLabel: "Valid until Aug 2026",
    tooltip:
      "Required for all hospital onboarding and privileging processes.",
    actions: [],
    assignees: [],
  },
  {
    id: "board-certification",
    title: "Board Certification",
    status: "pending",
    estimatedTime: "3–5 mins",
    description: "Specialty board certification pending verification",
    subLabel: "Verification in progress",
    tooltip:
      "Required for all hospital onboarding and privileging processes.",
    actions: [
      { id: "remind-later", label: "Remind Later", variant: "outline" },
    ],
    assignees: [],
  },
  {
    id: "acls-certification",
    title: "ACLS Certification",
    status: "expired",
    estimatedTime: "2 mins",
    description: "Advanced Cardiovascular Life Support certification",
    subLabel: "Expired 12 days ago",
    tooltip:
      "Required for all hospital onboarding and privileging processes.",
    actions: [{ id: "upload-now", label: "Upload Now", variant: "primary" }],
    assignees: [],
  },
  {
    id: "hospital-privileges",
    title: "Hospital Privileges",
    status: "missing",
    estimatedTime: "5–7 mins",
    description: "Active hospital admitting privileges documentation",
    subLabel: "Document required",
    tooltip:
      "Required for all hospital onboarding and privileging processes.",
    actions: [
      { id: "add-entry", label: "Add Entry", variant: "outline" },
      { id: "mark-na", label: "Mark N/A", variant: "ghost" },
    ],
    assignees: [
      { id: "1", initials: "S", bg: "bg-indigo-500" },
      { id: "2", initials: "R", bg: "bg-slate-700" },
    ],
  },
];

// Notifications list (you can replace with data from your hook / API)
export const notificationsData = [
  {
    id: "n1",
    title: "State License Renewal Required",
    message:
      "Your State Medical License expires on Nov 15, 2025. Action required within 15 days.",
    type: "warning", // warning | success | info | error
    category: "Credential",
    status: "unread", // unread | read
    isNew: true,
    actionLabel: "Renew License",
    createdAt: "2025-01-10T12:00:00Z",
    isHighlighted: true, // shows the blue left bar like the screenshot
  },
  {
    id: "n2",
    title: "License Verification Complete",
    message:
      "Your Medical License has been verified successfully on Oct 10, 2025.",
    type: "success",
    category: "Credential",
    status: "read",
    isNew: false,
    actionLabel: "View Document",
    createdAt: "2025-01-16T10:00:00Z",
  },
  {
    id: "n3",
    title: "DEA Certificate Expiring Soon",
    message:
      "Your DEA Certificate will expire in 30 days. Please renew to maintain compliance.",
    type: "warning",
    category: "Credential",
    status: "unread",
    isNew: false,
    actionLabel: "Upload Renewal",
    createdAt: "2025-01-16T07:00:00Z",
  },
  {
    id: "n4",
    title: "New Access Request",
    message:
      "Memorial Hospital has requested access to your credentialing documents.",
    type: "info",
    category: "Access",
    status: "unread",
    isNew: false,
    actionLabel: "Review Request",
    createdAt: "2025-01-15T18:00:00Z",
  },
  {
    id: "n5",
    title: "Failed Verification",
    message:
      "Unable to verify ACLS Certification. Please review and resubmit documentation.",
    type: "error",
    category: "Credential",
    status: "read",
    isNew: false,
    actionLabel: "Resubmit",
    createdAt: "2025-01-16T10:30:00Z",
  },
];
