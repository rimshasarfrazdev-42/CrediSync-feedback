// src/routes.js

import SignUp from './pages/auth/registration';
import Login from './pages/auth/login';
import VerifyEmail from './pages/auth/verifyEmail';
import ResetPassword from './pages/auth/resetPassword';
import CreateNewPassword from './pages/auth/createNewPassword';
import { routePaths } from './constants/paths';

import IdentityVerification from './pages/auth/identifyVerfication';

import reverification from './pages/auth/reverification';
import VerifiedSection from './pages/auth/verifiedSection';
import ProfessionalRoleSection from './pages/auth/professionalRole';
import ResetSuccess from './pages/auth/resetSuccess';

import Home from './pages/home';
import OnBoarding from './pages/onboardingScreens/onBoarding';
import CheckllistNotification from './pages/checklistNotification';
import ChecklistNotification from './pages/checklistNotification';
import { Dashboard } from './pages/Dashboard';
import { Readiness } from './pages/Readiness';
import { CredentialsSharingPage } from './pages/CredentialsSharingPage';
import UploadCredential from './pages/onboardingScreens/uploadCredential';
import CredentialVaultPage from './pages/CredentialVaultPage';
import LegalAndConsentManagementPage from './pages/LegalAndConsentManagementPage';
import ChoosePlan from './pages/pricingPlan/choosePlan';
import Checkout from './pages/pricingPlan/checkout';
import SubscriptionActive from './pages/pricingPlan/subscriptionActive';
import AccountSettings from './pages/AccountSettings';

export const publicRoutes = [
  { name: 'Home', path: routePaths.Home, component: Home, exact: true },
  { name: 'SignUp', path: routePaths.register, component: SignUp, exact: true },
  { name: 'Login', path: routePaths.Login, component: Login, exact: true },
  { name: 'VerifyEmail', path: routePaths.VerifyEmail, component: VerifyEmail, exact: true },
  { name: 'ResetPassword', path: routePaths.ResetPassword, component: ResetPassword, exact: true },
  { name: 'CreateNewPassword', path: routePaths.CreateNewPassword, component: CreateNewPassword, exact: true },
  { name: 'IdentifyVerification', path: routePaths.IdentityVerification, component: IdentityVerification, exact: true },
  { name: 'Verifiedsection', path: routePaths.VerifiedSection, component: VerifiedSection, exact: true },
  { name: 'reverification', path: routePaths.reverification, component: reverification, exact: true },
  {
    name: 'ProfessionalRole',
    path: routePaths.ProfessionalRoleSection,
    component: ProfessionalRoleSection,
    exact: true,
  },
  { name: 'ResetSuccess', path: routePaths.ResetSuccess, component: ResetSuccess, exact: true },
  { name: 'onboarding', path: routePaths.OnBoarding, component: OnBoarding, exact: true },
  {
    name: 'checklist-notification',
    path: routePaths.ChecklistNotification,
    component: ChecklistNotification,
    exact: true,
  },
  { name: 'dashboard', path: routePaths.Dashboard, component: Dashboard, exact: true },
  { name: 'readines', path: routePaths.Readiness, component: Readiness, exact: true },
  {
    name: 'credential-sharing',
    path: routePaths.CredentialsSharingPage,
    component: CredentialsSharingPage,
    exact: true,
  },
  {
    name: 'upload-credentials',
    path: routePaths.UploadCredential,
    component: UploadCredential,
    exact: true,
  },
   {
    name: 'credential-vault',
    path: routePaths.CredentialVaultPage,
    component: CredentialVaultPage,
    exact: true,
  },
     {
    name: 'legal',
    path: routePaths.LegalAndConsentManagementPage ,
    component: LegalAndConsentManagementPage ,
    exact: true,
  },
      {
    name: 'choose-plan',
    path: routePaths.ChoosePlan ,
    component: ChoosePlan ,
    exact: true,
  },
      {
    name: 'checkout',
    path: routePaths.Checkout ,
    component: Checkout ,
    exact: true,
  },
      {
    name: 'subscription',
    path: routePaths.SubscriptionActive ,
    component: SubscriptionActive ,
    exact: true,
  },
        {
    name: 'account-setting',
    path: routePaths.AccountSettings ,
    component: AccountSettings ,
    exact: true,
  },
];
