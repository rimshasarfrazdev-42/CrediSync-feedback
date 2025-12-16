export const topMenu = [
  { icon: "/Dashboard/homeIcon.svg", text: "Dashboard", path: "/dashboard" },
  { icon: "/Dashboard/credentialsVaultIcon.svg", text: "Credential Vault", path: "/credential-vault" },
  { icon: "/Dashboard/credentialsReadinessScore.svg", text: "Credential Readiness Score", path: "/readiness" },
  { icon: "/Dashboard/checkListIcon.svg", text: "Checklist & Notifications", path: "/notification" },
  { icon: "/Dashboard/credentialsSharing.svg", text: "Credential Sharing", path: "/credential-sharing" },
];

export const bottomMenu = [
  // Open Profile tab
  {
    icon: "/Dashboard/settingsIcon.svg",
    text: "Settings",
    path: "/account-setting",
    tab: "profile",
  },
  // Open Billing tab
  {
    icon: "/Dashboard/billingIcon.svg",
    text: "Billing & Management",
    path: "/account-setting",
    tab: "account",   // this matches your `tabs` id for BillingManagementContainer
  },
  {
    icon: "/Dashboard/legalIcon.svg",
    text: "Legal & Consent Logs",
    path: "/legal",
  },
];
